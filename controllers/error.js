exports.errorPage = (req, res) => {
    console.log('hello');
    res.status(404).render('404', {pageTitle: " Not Found", path: 'nothing'});
}