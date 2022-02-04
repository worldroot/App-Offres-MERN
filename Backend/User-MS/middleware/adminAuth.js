  exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  };
  
  exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
      if (req.user.role !== "super-admin") {
        return res.status(400).json({ message: "Admin access denied" });
      }
    }
    next();
  };
  
  exports.superAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "super-admin") {
      return res.status(200).json({ message: "Super Admin access denied" });
    }
    next();
  };  