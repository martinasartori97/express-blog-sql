const express = require('express')
const router = express.Router()
const PostsController = require('../controllers/posts-controllers.js')

router.get('/', PostsController.index)
router.get('/:slug', PostsController.show)
router.post('/', PostsController.store)
router.put("/:slug", PostsController.update)
router.delete("/:slug", PostsController.destroy)




module.exports = router