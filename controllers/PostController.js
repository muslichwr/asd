const prisma = require("../prisma/client")

const {validationResult} = require("express-validator");

const fs = require("fs");

const path = require('path');

const findPosts = async (req, res) => {
    try {
        
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                image: true,
                title: true,
                content: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        res.status(200).send({
            success:true,
            message: "Get all post successfully",
            data: posts,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server Error",
        });
    }
};

const createPosts = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {

        const post = await prisma.post.create({
            data : {
                image : req.file.filename,
                title : req.body.title,
                content : req.body.content,
            },
        });

        res.status(201).send({
            success: true,
            message: "Post created successfully",
            data: post,
        });
        
    } catch (error) {
        req.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};

const findPostById = async (req, res) => {
    const {id} = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                image: true,
                title: true,
                content: true,
            },
        });

        res.status(200).send({
           success: true,
           message: `Get post By ID :${id}`,
           data: post,
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

const updatePost = async (req, res) => {
    const {id} = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "validation error",
            errors: errors.array(),
        });
    }

    try {
        const dataPost = {
            title: req.body.title,
            content: req.body.content,
            updatedAt: new Date(),
        }

        if (req.file) {
            dataPost.image = req.file.filename;

            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (post && post.image) {
                const oldImagePath = path.join(process.cwd(), 'uploads', post.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                } else {
                    console.log('File tidak ditemukan:', oldImagePath);
                }
            }
        
        }

        const post = await prisma.post.update({
            where:{
                id: Number(id),
            },
            data: dataPost,
        });

        res.status(200).send({
            success: true,
            message: 'Post update successfully',
            data: post,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });
    }

};

module.exports = {findPosts,createPosts,findPostById,updatePost};