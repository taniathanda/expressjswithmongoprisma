const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

async function main(){
    exports.getPosts = async (req, res) => {
        const posts = await prisma.post.findMany(
            {
                where: { authorId: req.session.userId}
            }
        );
        res.render('posts/list', { posts, title: 'posts'});
    };

    // exports.getCreatePost = (req, res) => {
    //     res.render('posts/create', { title: 'create post'});
    // };
    exports.getCreatePost = async (req, res) => {
    try {
        const categories = await prisma.category.findMany(); // Fetch categories from the database
        res.render('posts/create', { categories,title: 'posts creating' }); // Pass categories to the view
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).send('Error retrieving categories');
    }
    };
  
    // table will be created auto in mongodb
    exports.postCreatePost = async (req, res) => {
        const { categoryid, title, content} = req.body;
        await prisma.post.create({
            data: {
                categoryid,
                title,
                content,
                authorId: req.session.userId,
            },
        });
        res.redirect('/posts');
    };

    exports.getEditPost = async (req, res) => {
        const post = await prisma.post.findUnique({
            where: { id: req.params.id, authorId: req.session.userId },
        });
        if (!post) return res.redirect('/posts');
        res.render('posts/edit', { post, title: 'post edit' });
    };

    
    exports.postEditPost = async (req, res) => {
        console.log(req.body);
        const { title, content } = req.body;
        await prisma.post.update({
            where: { id: req.params.id, authorId: req.session.userId },
            data: { title, content },
        });
        res.redirect('/posts');
    };

    exports.postDeletePost = async (req, res) => {
        await prisma.post.delete({
            where: { id: req.params.id, authorId: req.session.userId},
        });
        res.redirect('/posts');
    }; 
}

//prisma checking error 
main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })