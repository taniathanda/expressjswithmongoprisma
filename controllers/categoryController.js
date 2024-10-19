const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main(){
    // exports.getCategories = async (req, res) => {
    //     const categories = await prisma.category.findMany(
    //         {
    //             where: { authorId: req.session.userId}
    //         }
    //     );
    //     res.render('categories', { categories, title: 'categories'});
    // };

    exports.getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        // res.render('categories', { categories });
         res.render('categories/list', { categories , title: 'categories'});
       
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).send('Error retrieving categories');
    }
    };

    exports.getCreateCategory = (req, res) => {
        res.render('categories/create', { title: 'create category'});
    };

    // table will be created auto in mongodb
    // exports.postCreateCategory = async (req, res) => {
    //     const { name, description} = req.body;
    //     await prisma.category.create({
    //         data: {
    //             name,
    //             description,
    //             authorId: req.session.userId,
    //         },
    //     });
    //     res.redirect('/categories');
    // };

    exports.postCreateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newCategory = await prisma.category.create({
        data: { name, description },
        });

        // Redirect to the '/categories' route upon successful insertion
        res.redirect('/categories');
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: error.message || 'Category creation failed' });
    }
    };

     exports.getEditCategory = async (req, res) => {
        const category = await prisma.category.findUnique({
             where: { id: req.params.id },   //, authorId: req.session.userId
        });
        if (!category) return res.redirect('/categories');
        res.render('categories/edit', { category, title: 'category edit' });
    };

    exports.postEditCategory = async (req, res) => {
        console.log(req.body);
        const { name, description } = req.body;
        await prisma.category.update({
            where: { id: req.params.id }, //, authorId: req.session.userId
            data: { name, description },
        });
        res.redirect('/categories');
    };

    exports.postDeleteCategory = async (req, res) => {
        await prisma.category.delete({
            where: { id: req.params.id},  //, authorId: req.session.userId
        });
        res.redirect('/categories');
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