const log = {
  info: (scope, message) => {
    console.log(`[INFO] [${scope}] ${message}`);
  },

  success: (scope, message) => {
    console.log(`[SUCCESS] [${scope}] ${message}`);
  },

  warn: (scope, message) => {
    console.warn(`[WARN] [${scope}] ${message}`);
  },

  error: (scope, message, err) => {
    console.error(`[ERROR] [${scope}] ${message}`);

    if (err) {
      console.error(err);
    }
  },
};

export default log;
