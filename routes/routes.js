var express = require("express");
var router = express.Router();
var Blog = require("../models/blog.js");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

router.use(methodOverride("_method"));
router.use(expressSanitizer());
// RESTFUL ROUTES

router.get("/", function(req, res){
	res.redirect("/blogs");
})

// INDEX ROUTE
router.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("ERROR");
		} else {
			blogs.reverse();
			res.render("index", {blogs: blogs});
		}
	})
})

// NEW ROUTE
router.get("/blogs/new", function(req, res){
	res.render("new")
});

// CREATE ROUTE
router.post("/blogs", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTE
router.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT ROUTE
router.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	})
});

// UPDATE ROUTE
router.put("/blogs/:id", function(req, res){
	// id, new data, callback
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
router.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
});

module.exports = router;