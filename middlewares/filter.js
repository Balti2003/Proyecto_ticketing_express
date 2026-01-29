export default function buildFilter(req, res, next) {
    const {status, priority, search, user} = req.query;

    let filter = {};
    if (status) { filter.status = status; }
    if (priority) { filter.priority = priority; }

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }
    
    if (user) {
        filter.user = user;
    }
    
    req.filter = filter;
    next();
}