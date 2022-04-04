const router01 = require('express').Router();
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth'); 

router01.get('/', (req, res) => {
   Post.findAll({
      attributes: ['id', 'post_content', 
                  'title', 
                  'created_at'
               ],
      order: [['created_at', 'DESC']],  
      include: [ 
         {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {   
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   })
   .then(dbPostData => res.json(dbPostData))  
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
 });

 router01.get('/:id', (req, res) => {
   Post.findOne({
      where: {
         id: req.params.id
      },
      attributes: ['id', 'post_content', 
         'title', 
         'created_at'
      ],
      include: [
         {
         model: User,
         attributes: ['username']
         }
      ]
   })
   .then(dbPostData => {
      if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
      }
      res.json(dbPostData);  
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

router01.post('/', (req, res) => {  
   Post.create({
     title: req.body.title,
     post_content: req.body.post_content,
     user_id: req.session.user_id // this is the bridge
   })
     .then(dbPostData => res.json(dbPostData))  
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
});
 
 // -- Updating Post's Title
 router01.put('/:id', (req, res) => {
   Post.update(
         {
            // update post_content and title 
            title: req.body.title,
            post_content: req.body.post_content 
         },
         {
            where: {
            id: req.params.id
            }
         }
      )
      .then(dbPostData => {
         if (!dbPostData) {
         res.status(404).json({ message: 'No post found with this id' });
         return;
         }
         res.json(dbPostData);   
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });

// -- Delete a Post
router01.delete('/:id', (req, res) => {
   Post.destroy({
         where: {
            id: req.params.id
         }
      })
      .then(dbPostData => {
         if (!dbPostData) {
         res.status(404).json({ message: 'No post found with this id' });
         return;
         }
         res.json(dbPostData);  
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err); 
      });
   });
}); 

router01.delete('/:id', withAuth, (req, res) => {
   console.log('id', req.params.id);
   Post.destroy({
     where: {
       id: req.params.id
     }
   })
     .then(dbPostData => {
       if (!dbPostData) {
         res.status(404).json({ message: 'No post found with this id' });
         return;
       }
       res.json(dbPostData);
     })
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
 });

module.exports = router01;

