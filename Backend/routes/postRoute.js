import express from 'express';
import multer from 'multer';
import { Post } from "../models/postModel.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../constants.js';

const router = express.Router();

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

// Configuring multer for handling file uploads with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // The Cloudinary folder to store the uploaded images
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed image formats
    }
});

const upload = multer({ storage: storage });


// GET endpoint to retrieve posts by Id:

// Endpoint: /posts/:id
// Method: GET
// Parameters:
// id (Path Parameter): The unique identifier of the post.
// Response:
// Status Code: 200 OK
// Body: JSON object representing the post with the specified ID.
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const posts = await Post.findById(id);

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET endpoint to retrieve all posts:

// Endpoint: /posts
// Method: GET
// Response:
// Status Code: 200 OK
// Body: JSON array representing all posts with limited fields.
router.get('/', async (req, res) => {
    try {
        // Retrieve posts from the database
        const posts = await Post.find({}, 'title description tags image');

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET endpoint to retrieve posts with optional filter, sort, and pagination:

// Endpoint: /api/posts/
// Method: GET
// Parameters:
// filter (Query Parameter): Optional. Search string for filtering posts by title or description.
// sort (Query Parameter): Optional. Sort posts based on a field, default is -createdAt (descending order by creation date).
// page (Query Parameter): Optional. Page number for pagination.
// limit (Query Parameter): Optional. Number of posts per page.
// Response:
// Status Code: 200 OK
// Body: JSON array representing filtered, sorted, and paginated posts.
router.get('/', async (req, res) => {
    try {
        const { filter, sort, page, limit } = req.query;

        // A filter object based on the query parameters
        const filterObject = filter ? { $or: [{ title: { $regex: filter, $options: 'i' } }, { description: { $regex: filter, $options: 'i' } }] } : {};

        // Mongoose to find and filter posts
        const posts = await Post.find(filterObject)
            .sort(sort || '-createdAt') // Default sort by createdAt in descending order
            .skip((page - 1) * limit)
            .limit(limit);

        // Send the posts as a JSON response
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET endpoint to search keywords in the title and description:

// Endpoint: /api/posts/search
// Method: GET
// Parameters:
// keyword (Query Parameter): The keyword to search for in post titles and descriptions.
// Response:
// Status Code: 200 OK
// Body: JSON array representing posts that match the search keyword.
router.get('/search', async (req, res) => {
    try {
        const { keyword } = req.query;

        // Mongoose to find posts matching the keyword in title or description
        const posts = await Post.find({
            $or: [{ title: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }]
        });

        // Send the matching posts as a JSON response
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// GET endpoint to filter posts using tags:

// Endpoint: /api/posts/tags/:tag
// Method: GET
// Parameters:
// tag (Path Parameter): The tag used to filter posts.
// Response:
// Status Code: 200 OK
// Body: JSON array representing posts with the specified tag
router.get('/tags/:tag', async (req, res) => {
    try {
        const { tag } = req.params;

        // Mongoose to find posts with the specified tag
        const posts = await Post.find({ tags: tag });

        // Send the matching posts as a JSON response
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint to save a new Post:

// Endpoint: /api/posts/
// Method: POST
// Request Body:
// title (Required): The title of the post.
// description (Required): The description of the post.
// tags (Optional): An array of tags associated with the post.
// image (Required): The image file to be uploaded.
// Response:
// Status Code: 201 Created
// Body: JSON object representing the newly created post.
router.post('/', upload.single('image'), async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.description
            // !request.body.image
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, description, image',
            });
        }

        const imageUrl = request.file.path;

        const newBook = {
            title: request.body.title,
            description: request.body.description,
            tags: request.body.tags,
            image: imageUrl
        };

        const post = await Post.create(newBook);

        return response.status(201).send(post);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;