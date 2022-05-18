const db = require("../../db")

//models affichage tous les posts et partages 
module.exports = (req, res) => {

    db.query(
        `SELECT posts.id_post, posts.id_user, posts.date_post, posts.message, users.lastname, users.firstname, users.image
        FROM users, posts
        WHERE posts.id_user = users.id_user`,
        [],
        (err, result_post) => {
            if (err) {
                res.status(400).json({
                    error: err
                })
            } else {
                db.query(
                    `SELECT *

                    FROM
                    (SELECT share.id_share, posts.id_post AS id_post_share, users.id_user AS id_user_share, users.lastname AS lastname_share, users.firstname AS firstname_share, share.date_share, users.image as image_share
                    FROM share, posts, users
                    WHERE share.id_post = posts.id_post
                    AND share.id_user = users.id_user) AS share_table,
                    
                    (SELECT posts.id_post, posts.id_user AS id_user_create, posts.date_post, posts.message, users.lastname AS lastname_create, users.firstname AS firstname_create, users.image as image_create
                    FROM users, posts
                    WHERE posts.id_user = users.id_user) AS post_table
                    
                    WHERE id_post = id_post_share`,
                    [],
                    (err, result_share) => {
                        if (err) {
                            res.status(400).json({
                                error: err
                            })
                        } else {

                            let post_table = []
                            let share_table = []
                            let final_table = []

                            result_post.forEach(post => {
                                post_table.push({
                                    type: 'post',
                                    id_post: post.id_post,
                                    id_user_post: post.id_user,
                                    image_user_post: post.image == '' ? '' : `${req.protocol}://${req.get("host")}/${post.image}`,
                                    name_user_post: `${post.firstname} ${post.lastname}`,
                                    date_post: post.date_post,
                                    date_sort: post.date_post,
                                    message: post.message
                                })
                            })

                            result_share.forEach(share => {
                                share_table.push({
                                    type: 'share',
                                    id_share: share.id_share,
                                    id_post: share.id_post,
                                    id_user_post: share.id_user_create,
                                    id_user_share: share.id_user_share,
                                    name_user_post: `${share.firstname_create} ${share.lastname_create}`,
                                    name_user_share: `${share.firstname_share} ${share.lastname_share}`,
                                    image_user_post: share.image_create == '' ? '' : `${req.protocol}://${req.get("host")}/${share.image_create}`,
                                    date_post: share.date_post,
                                    date_share: share.date_share,
                                    date_sort: share.date_share,
                                    message: share.message
                                })
                            })

                            final_table = [...post_table, ...share_table]
                            final_table.sort(function (a, b) {
                                return new Date(b.date_sort) - new Date(a.date_sort);
                            });

                            res.status(200).json(final_table)

                        }
                    }
                )
            }
        }
    )


}