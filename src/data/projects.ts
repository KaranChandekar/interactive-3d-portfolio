export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  heroImage: string;
  tags: string[];
  date: string;
  team: string;
  client: string;
  challenge: string;
  solution: string;
  codeSnippet: string;
  outcomes: { label: string; value: string }[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management and AI-powered recommendations.",
    fullDescription: "Built a comprehensive e-commerce platform handling millions of transactions. Features include real-time inventory sync, AI-driven product recommendations, and a seamless checkout experience optimized for mobile.",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
    date: "2025",
    team: "4 Engineers",
    client: "RetailCo",
    challenge: "The client needed a platform that could handle flash sales with 100k concurrent users while maintaining sub-second page loads and real-time inventory accuracy.",
    solution: "We implemented edge caching with ISR, Redis-backed inventory locks, and optimistic UI updates. The checkout flow was redesigned to minimize API calls using local state management.",
    codeSnippet: `// Real-time inventory lock system
async function acquireInventoryLock(
  productId: string,
  quantity: number
): Promise<boolean> {
  const key = \`inventory:\${productId}\`;
  const result = await redis.eval(
    \`local stock = tonumber(redis.call('get', KEYS[1]))
     if stock >= tonumber(ARGV[1]) then
       redis.call('decrby', KEYS[1], ARGV[1])
       return 1
     end
     return 0\`,
    1, key, quantity
  );
  return result === 1;
}`,
    outcomes: [
      { label: "Page Load Time", value: "0.8s" },
      { label: "Conversion Rate", value: "+34%" },
      { label: "Uptime", value: "99.99%" },
      { label: "Peak Users", value: "120K" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "ai-dashboard",
    title: "AI Analytics Dashboard",
    description: "Real-time ML model monitoring dashboard with interactive visualizations and alerting.",
    fullDescription: "Designed and built a comprehensive dashboard for monitoring machine learning model performance in production. Features real-time metrics streaming, anomaly detection alerts, and interactive data exploration tools.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    tags: ["React", "D3.js", "WebSocket", "Python", "TensorFlow"],
    date: "2025",
    team: "3 Engineers",
    client: "DataFlow AI",
    challenge: "ML engineers needed real-time visibility into model drift, prediction latency, and feature importance across 50+ production models without overwhelming the monitoring infrastructure.",
    solution: "Built a WebSocket-based streaming architecture with intelligent data aggregation on the server side. Implemented progressive rendering for large datasets and client-side anomaly detection for instant alerts.",
    codeSnippet: `// WebSocket streaming with backpressure
class MetricsStream {
  private buffer: Metric[] = [];
  private readonly maxBuffer = 1000;

  onMessage(metric: Metric) {
    this.buffer.push(metric);
    if (this.buffer.length >= this.maxBuffer) {
      this.flush();
    }
  }

  private flush() {
    const aggregated = this.aggregate(this.buffer);
    this.emit('metrics', aggregated);
    this.buffer = [];
  }
}`,
    outcomes: [
      { label: "Models Monitored", value: "50+" },
      { label: "Alert Latency", value: "<2s" },
      { label: "Data Points/Day", value: "10M+" },
      { label: "Downtime Saved", value: "200hrs" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "social-media-app",
    title: "Social Media App",
    description: "A mobile-first social platform with real-time messaging, stories, and content discovery.",
    fullDescription: "Created a social media application focused on authentic connections. Features include ephemeral stories, real-time group messaging, AI-curated content feeds, and privacy-first design principles.",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop",
    tags: ["React Native", "GraphQL", "Node.js", "MongoDB", "AWS"],
    date: "2024",
    team: "6 Engineers",
    client: "ConnectHub",
    challenge: "Building a social platform that could scale to millions of users while keeping message delivery under 100ms and maintaining end-to-end encryption for all private communications.",
    solution: "Implemented a microservices architecture with dedicated messaging, feed, and media services. Used GraphQL subscriptions for real-time updates and a custom CDN pipeline for media optimization.",
    codeSnippet: `// GraphQL subscription for real-time messages
const MESSAGE_SUBSCRIPTION = gql\`
  subscription OnNewMessage($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      id
      content
      sender { id name avatar }
      createdAt
      encrypted
    }
  }
\`;`,
    outcomes: [
      { label: "Daily Active Users", value: "500K" },
      { label: "Msg Delivery", value: "<50ms" },
      { label: "App Rating", value: "4.8★" },
      { label: "Retention (30d)", value: "68%" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "fintech-wallet",
    title: "Fintech Digital Wallet",
    description: "Secure digital wallet with multi-currency support, instant transfers, and spending analytics.",
    fullDescription: "Developed a PCI-compliant digital wallet supporting 20+ currencies with instant P2P transfers, automated savings rules, and comprehensive spending analytics with category-based budgeting.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=600&fit=crop",
    tags: ["Swift", "Kotlin", "Go", "PostgreSQL", "Plaid"],
    date: "2024",
    team: "5 Engineers",
    client: "PayFlow",
    challenge: "Achieving PCI DSS Level 1 compliance while maintaining a frictionless UX, supporting multi-currency real-time conversions, and processing transfers in under 3 seconds.",
    solution: "Built a tokenized payment infrastructure with hardware security modules. Implemented real-time FX rate streaming and optimistic transfer confirmations with background settlement.",
    codeSnippet: `// Multi-currency transfer with FX
func (s *TransferService) Execute(
  ctx context.Context,
  req TransferRequest,
) (*Transfer, error) {
  rate, err := s.fx.GetRate(
    ctx, req.FromCurrency, req.ToCurrency,
  )
  if err != nil {
    return nil, fmt.Errorf("fx rate: %w", err)
  }
  converted := req.Amount.Mul(rate.Rate)
  // ... process transfer
}`,
    outcomes: [
      { label: "Transactions/Day", value: "2M+" },
      { label: "Transfer Speed", value: "<2s" },
      { label: "Currencies", value: "24" },
      { label: "Fraud Rate", value: "0.01%" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "devops-platform",
    title: "DevOps Automation Platform",
    description: "CI/CD orchestration platform with infrastructure-as-code and automated security scanning.",
    fullDescription: "Built an enterprise DevOps platform that unified CI/CD pipelines, infrastructure provisioning, and security scanning into a single pane of glass. Reduced deployment times by 80% and eliminated manual infrastructure management.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop",
    tags: ["Go", "Terraform", "Kubernetes", "ArgoCD", "React"],
    date: "2024",
    team: "4 Engineers",
    client: "CloudScale",
    challenge: "Enterprise teams were managing 200+ microservices across 3 cloud providers with inconsistent deployment practices, leading to frequent outages and 45-minute average deployment times.",
    solution: "Created a unified platform with declarative pipeline definitions, GitOps-based deployments, and automated rollbacks. Integrated OPA for policy enforcement and Trivy for security scanning.",
    codeSnippet: `// Pipeline definition DSL
pipeline "deploy-service" {
  trigger {
    branch = "main"
    paths  = ["src/**", "deploy/**"]
  }

  stage "test" {
    parallel {
      step "unit"  { run = "go test ./..." }
      step "lint"  { run = "golangci-lint run" }
      step "scan"  { run = "trivy fs ." }
    }
  }

  stage "deploy" {
    step "apply" {
      run    = "kubectl apply -k deploy/"
      rollback = true
    }
  }
}`,
    outcomes: [
      { label: "Deploy Time", value: "5min" },
      { label: "Deployments/Day", value: "150+" },
      { label: "Incident Reduction", value: "72%" },
      { label: "Services Managed", value: "200+" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
    ],
  },
  {
    slug: "health-tracker",
    title: "Health & Fitness Tracker",
    description: "Comprehensive health platform with wearable integration, meal planning, and AI coaching.",
    fullDescription: "Developed a health and fitness platform that integrates with 15+ wearable devices, provides AI-powered workout recommendations, automated meal planning based on dietary goals, and detailed health analytics.",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    tags: ["Flutter", "Firebase", "TensorFlow Lite", "Node.js", "HealthKit"],
    date: "2023",
    team: "5 Engineers",
    client: "VitaTrack",
    challenge: "Aggregating health data from diverse wearable APIs with different data formats, providing personalized AI recommendations, and ensuring HIPAA compliance for health data storage.",
    solution: "Built a unified health data adapter layer, on-device ML for real-time activity classification, and a HIPAA-compliant cloud infrastructure with end-to-end encryption for all health records.",
    codeSnippet: `// On-device activity classification
class ActivityClassifier {
  private model: TFLiteModel;

  async classify(
    sensorData: SensorReading[]
  ): Promise<Activity> {
    const tensor = this.preprocess(sensorData);
    const prediction = await this.model.run(tensor);
    return {
      type: ACTIVITIES[prediction.argMax()],
      confidence: prediction.max(),
      calories: this.estimateCalories(prediction),
    };
  }
}`,
    outcomes: [
      { label: "Active Users", value: "250K" },
      { label: "Devices Supported", value: "15+" },
      { label: "Health Score Accuracy", value: "94%" },
      { label: "User Goal Completion", value: "78%" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=500&fit=crop",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, count = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, count);
}
