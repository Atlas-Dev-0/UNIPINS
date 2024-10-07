import express from 'express'
import axios from 'axios'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('unipins-database.json')
const middlewares = jsonServer.defaults()

const app = express()
const PORT = 5000 // Server's port

// Allow cross-origin requests
app.use(cors())
app.use(express.json())

// Base URL of the JSON server
const JSON_SERVER_URL = 'http://localhost:3000'

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve static files from the public directory
app.use('/public', express.static(path.join(__dirname, 'public')))

// Get all organizations
app.get('/organizations', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/organizations`)
    const organizations = response.data // Assuming response data is already an array
    res.json(organizations)
  } catch (error) {
    console.log('500 - ERROR')
    res.status(500).json({ error: 'Error fetching organizations' })
  }
})

// Get a specific organization by ID
app.get('/organizations/:id', async (req, res) => {
  const { id } = req.params
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/organizations`)
    const organizations = response.data

    // Find organization by ID (assuming organizations is an array)
    const organization = organizations.find((org) => org.id === parseInt(id, 10))

    if (organization) {
      res.json(organization)
    } else {
      res.status(404).json({ error: 'Organization not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organization' })
  }
})

// Add a new organization
app.post('/organizations', async (req, res) => {
  const newOrganization = req.body

  try {
    // Fetch existing organizations
    const response = await axios.get(`${JSON_SERVER_URL}/organizations`)
    const organizations = response.data

    // Create a new ID based on the highest existing one
    const newId = Math.max(...organizations.map((org) => org.id)) + 1
    newOrganization.id = newId

    // Post new organization to JSON server
    const addedResponse = await axios.post(`${JSON_SERVER_URL}/organizations`, newOrganization)
    res.status(201).json(addedResponse.data)
  } catch (error) {
    res.status(500).json({ error: 'Error adding organization' })
  }
})

// Update an organization
app.put('/organizations/:id', async (req, res) => {
  const { id } = req.params
  const updatedOrganization = req.body

  try {
    const response = await axios.get(`${JSON_SERVER_URL}/organizations`)
    const organizations = response.data

    // Check if the organization exists
    const organizationIndex = organizations.findIndex((org) => org.id === parseInt(id, 10))
    if (organizationIndex !== -1) {
      // Update organization
      const updatedResponse = await axios.put(
        `${JSON_SERVER_URL}/organizations/${id}`,
        updatedOrganization
      )
      res.json(updatedResponse.data)
    } else {
      res.status(404).json({ error: 'Organization not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating organization' })
  }
})

// Delete an organization
app.delete('/organizations/:id', async (req, res) => {
  const { id } = req.params

  try {
    const response = await axios.get(`${JSON_SERVER_URL}/organizations`)
    const organizations = response.data

    // Check if the organization exists
    const organization = organizations.find((org) => org.id === parseInt(id, 10))
    if (organization) {
      await axios.delete(`${JSON_SERVER_URL}/organizations/${id}`)
      res.json({ message: 'Organization deleted successfully' })
    } else {
      res.status(404).json({ error: 'Organization not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting organization' })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
