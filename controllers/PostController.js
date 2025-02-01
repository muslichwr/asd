const prisma = require("../prisma/client")

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
        res.status(500.).send({
            success: false,
            message: "Internal server Error",
        });
    }
};

module.exports = {findPosts};