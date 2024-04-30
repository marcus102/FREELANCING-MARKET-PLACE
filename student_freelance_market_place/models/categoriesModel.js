const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        'UI/UX design',
        'Programming',
        'Sotware Testing',
        'ORM',
        'RESTful-architecture',
        'SQL',
        'algorithm',
        'authentication',
        'backend',
        'big-data',
        'blockchain',
        'blockchain-platforms',
        'cloud-computing',
        'cloud-architecture',
        'cloud-security',
        'computer-vision',
        'concurrency',
        'container-orchestration',
        'continuous-deployment',
        'continuous-integration',
        'cryptocurrency',
        'cross-platform',
        'cross-platform-development',
        'cybersecurity',
        'data-analytics',
        'data-cleaning',
        'data-engineering',
        'data-preprocessing',
        'data-science',
        'data-structures',
        'database',
        'database-design',
        'declarative-programming',
        'deep-learning',
        'design-patterns',
        'design-principles',
        'desktop',
        'devops',
        'distributed-systems',
        'encryption',
        'embedded-firmware',
        'embedded-systems',
        'end-to-end-testing',
        'error-handling',
        'event-driven-architecture',
        'feature-engineering',
        'frontend',
        'frameworks',
        'full-stack',
        'functional-programming',
        'game-development',
        'game-engine',
        'graphics-programming',
        'hardware',
        'hardware-design',
        'imperative-programming',
        'integration-testing',
        'IoT',
        'libraries',
        'logging',
        'machine-learning',
        'microcontroller-programming',
        'microservices',
        'mobile',
        'mobile-development',
        'mobile-frameworks',
        'model-deployment',
        'model-evaluation',
        'model-training',
        'monitoring',
        'native-apps',
        'natural-language-processing',
        'networking',
        'operating-systems',
        'orm',
        'parallel-computing',
        'performance-testing',
        'progressive-web-apps',
        'rating',
        'reactive-programming',
        'real-time',
        'responsive-design',
        'robotics',
        'scripting',
        'search-algorithms',
        'secure-coding',
        'security',
        'serverless',
        'software',
        'software-architecture',
        'sorting-algorithms',
        'smart-contracts',
        'sql',
        'test-automation',
        'testing',
        'tools',
        'UI/UX-design',
        'unit-testing',
        'user-experience',
        'user-interface',
        'virtual-reality',
        'virtualization',
        'web',
        'web-development',
        'web-frameworks',
        'web3',
        'other',
        'all'
      ],
      default: 'all'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
