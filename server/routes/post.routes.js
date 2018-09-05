import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as CameraController from '../controllers/camera.controller';
import * as WeatherController from '../controllers/weather.controller';
const router = new Router();

// Get all Camera Images
router.route('/camera').get(CameraController.getCameras);

// Get weather
router.route('/weather').get(WeatherController.getWeather);

// Get Map
router.route('/map').get(CameraController.getMap);

// Get Traffic information
router.route('/traffic/:src/:dst').get(WeatherController.getTraffic);

// Get all Posts
router.route('/posts').get(PostController.getPosts);

router.route('/status').get((req, res) => {
    res.json({status: 'Running healthy.'});
});

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
