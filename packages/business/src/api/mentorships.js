const express = require('express')
const Router = express.Router
const router = Router()
const Mentorship = require('../models/Mentorship')
const User = require('../models/User')
const Agent = require('../models/Agent')

const { permissions, hasPermission } = require('../permissions')

router.get('/', async (req, res, next) => {
  let userDoc
  try {
    userDoc = await User.findOne({ googleId: req.user.googleId }, 'role _id')
  } catch (err) {
    console.error('An error occurred:', err)
    next(err)
  }

  let mentorshipDocs

  if (hasPermission(userDoc.role, 'canViewAllMentorships')) {
    try {
      mentorshipDocs = await Mentorship.find()
        .populate('agents')
        .populate('technologies')
        .populate('mentorshipLead')
    } catch (err) {
      console.error('An error occurred:', err)
      next(err)
    }
  } else {
    let agentDoc
    try {
      agentDoc = await Agent.findOne({ userId: userDoc._id }, '_id')
    } catch (err) {
      console.error('An error occurred:', err)
      next(err)
    }

    try {
      mentorshipDocs = await Mentorship.find({
        $or: [{ agents: { $in: [agentDoc._id] } }, { mentorshipLead: { $in: [agentDoc._id] } }],
      })
        .populate('agents')
        .populate('technologies')
        .populate('mentorshipLead')
    } catch (err) {
      console.error('An error occurred:', err)
      next(err)
    }
  }

  res.status(200).json({ docs: mentorshipDocs })
})

router.get('/:mentorship_id', async (req, res, next) => {
  try {
    const { mentorship_id } = req.params
    const docs = await Mentorship.findById(mentorship_id)
      .populate('agents')
      .populate('technologies')
      .populate('mentorshipLead')
    res.status(200).send(docs)
  } catch (err) {
    console.error('An error occurred:', err)
    next(err)
  }
})

// Add a new mentorship
router.post('/', permissions('canAddMentorship'), async (req, res) => {
  const mentorship = new Mentorship({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    technologies: req.body.technologies,
    mentorshipLead: req.body.mentorshipLead,
    agents: req.body.agents,
  })

  mentorship
    .save()
    .then(doc => {
      res.status(200).send({ message: 'success', payload: doc })
    })
    .catch(err => {
      console.error('An error occurred while adding a new mentorship:', err)
      res.status(500).send({ message: err.message })
    })
})

// Update an existing mentorship
router.patch('/:mentorship_id', async (req, res, next) => {
  try {
    const { mentorship_id } = req.params
    const doc = await Mentorship.findByIdAndUpdate(mentorship_id, req.body)
    res.status(200).send(doc)
  } catch (err) {
    console.error('An error occurred while updating an existing agent:', err)
    next(err)
  }
})

// Delete a mentorship
router.delete('/:mentorship_id', async (req, res, next) => {
  try {
    const { mentorship_id } = req.params
    const doc = await Mentorship.findByIdAndRemove(mentorship_id)
    res.status(204).send(doc)
  } catch (err) {
    console.log('An error occurred while deleting a mentorship:', err)
    next(err)
  }
})

module.exports = router
