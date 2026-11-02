import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Navigation, 
  Utensils, 
  Clock, 
  Star, 
  TrendingUp, 
  Moon, 
  Sun, 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Truck, 
  Bike,
  Cpu,
  Layers,
  PackageCheck,
  Zap,
  Activity,
  CheckCircle2,
  Menu as MenuIcon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- INITIAL DATA ---
const RESTAURANTS = [
  {
    id: 0,
    name: "Green Bowl Kitchen",
    cuisine: "Healthy · Salad · Bowls",
    category: "Healthy",
    rating: 4.8,
    time: 20,
    fee: 25,
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    description: "Fresh organic bowls, wholesome salads, and vitality cold-pressed juices."
  },
  {
    id: 1,
    name: "Urban Pizza House",
    cuisine: "Italian · Artisan Pizza",
    category: "Pizza",
    rating: 4.6,
    time: 25,
    fee: 30,
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Wood-fired sourdough pizzas with artisanal toppings."
  },
  {
    id: 2,
    name: "Spice Route Express",
    cuisine: "North Indian · Curries",
    category: "Indian",
    rating: 4.7,
    time: 30,
    fee: 20,
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    description: "Rich traditional curries, freshly baked garlic naans, and biryanis."
  },
  {
    id: 3,
    name: "Burger District",
    cuisine: "Gourmet Burgers · Fries",
    category: "Burger",
    rating: 4.5,
    time: 18,
    fee: 20,
    vegetarian: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Smashed beef patties, crispy truffle fries, and thick milkshakes."
  },
  {
    id: 4,
    name: "Wok & Roll Asian",
    cuisine: "Chinese · Dim Sum",
    category: "Chinese",
    rating: 4.4,
    time: 28,
    fee: 25,
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    description: "Wok-fried noodles, handmade dumplings, and savory stir-fries."
  },
  {
    id: 5,
    name: "Sweet Cravings Bakery",
    cuisine: "Desserts · Pastries",
    category: "Dessert",
    rating: 4.9,
    time: 22,
    fee: 15,
    vegetarian: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    description: "Artisanal cakes, decadent brownies, and espresso drinks."
  }
];

const FOOD_ITEMS = [
  { id: 101, name: "Paneer Butter Masala", category: "Indian", restaurantId: 2, price: 249, weight: 3, veg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80", desc: "Creamy rich tomato gravy served with soft cottage cheese cubes." },
  { id: 102, name: "Truffle Margherita Pizza", category: "Pizza", restaurantId: 1, price: 299, weight: 4, veg: true, image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=400&q=80", desc: "San Marzano tomatoes, fresh mozzarella, fresh basil & truffle oil." },
  { id: 103, name: "Smoky Double Smash Burger", category: "Burger", restaurantId: 3, price: 219, weight: 2, veg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", desc: "Double beef patty, aged cheddar, caramelized onions, & secret sauce." },
  { id: 104, name: "Veg Hakka Chilli Noodles", category: "Chinese", restaurantId: 4, price: 179, weight: 3, veg: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80", desc: "Wok-tossed noodles with spring vegetables and Szechuan peppers." },
  { id: 105, name: "Belgian Chocolate Truffle Cake", category: "Dessert", restaurantId: 5, price: 149, weight: 1, veg: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80", desc: "Layered Belgian dark chocolate sponge cake with ganache." },
  { id: 106, name: "Avocado & Quinoa Bowl", category: "Healthy", restaurantId: 0, price: 229, weight: 2, veg: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80", desc: "Superfood bowl with Hass avocado, tri-color quinoa, seeds, & lemon herb dressing." }
];

const GRAPH_NODES = [
  { id: 0, name: "Green Bowl Kitchen", type: "depot", x: 140, y: 160 },
  { id: 1, name: "Urban Pizza House", type: "depot", x: 300, y: 100 },
  { id: 2, name: "Spice Route Express", type: "depot", x: 240, y: 320 },
  { id: 3, name: "Sector 17 Downtown", type: "stop", x: 90, y: 80 },
  { id: 4, name: "Sector 22 Residential", type: "stop", x: 200, y: 210 },
  { id: 5, name: "Sector 35 Tech Park", type: "stop", x: 360, y: 260 },
  { id: 6, name: "Sector 15 Campus", type: "stop", x: 340, y: 60 },
  { id: 7, name: "Sector 34 Square", type: "stop", x: 120, y: 340 },
  { id: 8, name: "Sector 43 Hub", type: "stop", x: 280, y: 400 },
  { id: 9, name: "Sector 8 Luxury Suites", type: "stop", x: 440, y: 140 }
];

const GRAPH_EDGES = [
  [0, 3, 2.1], [0, 4, 1.8], [0, 1, 3.4],
  [1, 6, 1.5], [1, 9, 2.8], [1, 4, 2.3],
  [2, 4, 2.0], [2, 7, 1.9], [2, 8, 2.5],
  [3, 6, 3.1], [3, 4, 2.2],
  [4, 5, 2.4], [4, 7, 2.6],
  [5, 8, 2.1], [5, 9, 2.0],
  [6, 9, 1.8], [7, 8, 2.2]
];

class MinPriorityQueue {
  constructor() { this.items = []; }
  enqueue(element, priority) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }
  dequeue() { return this.items.shift(); }
  isEmpty() { return this.items.length === 0; }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: "RE-984210",
      customerName: "Alex Morgan",
      phone: "9876543210",
      address: "Sector 35 Tech Park, Block B-4",
      items: [
        { name: "Truffle Margherita Pizza", quantity: 1, price: 299 },
        { name: "Belgian Chocolate Truffle Cake", quantity: 2, price: 149 }
      ],
      total: 622,
      status: "Out for delivery",
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'Cash on Delivery'
  });

  // Algorithm States
  const [startDepot, setStartDepot] = useState(0);
  const [selectedStops, setSelectedStops] = useState([3, 4, 5, 8]);
  const [algorithm, setAlgorithm] = useState('dijkstra'); // 'dijkstra', 'prims', 'bellman', 'bfs', 'dfs'
  const [bagCapacity, setBagCapacity] = useState(7);
  const [optimizedResult, setOptimizedResult] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const graphMap = useMemo(() => {
    const adj = new Map();
    GRAPH_NODES.forEach(n => adj.set(n.id, []));
    GRAPH_EDGES.forEach(([u, v, w]) => {
      adj.get(u).push({ to: v, weight: w });
      adj.get(v).push({ to: u, weight: w });
    });
    return adj;
  }, []);

  // --- DSA ALGORITHMS IMPLEMENTATION ---
  
  // 1. Dijkstra's Algorithm (Greedy Single-Source Shortest Path)
  const runDijkstra = (src, tgt) => {
    const dist = new Map();
    const prev = new Map();
    const pq = new MinPriorityQueue();

    GRAPH_NODES.forEach(n => {
      dist.set(n.id, Infinity);
      prev.set(n.id, null);
    });

    dist.set(src, 0);
    pq.enqueue(src, 0);

    while (!pq.isEmpty()) {
      const { element: u, priority: currentDist } = pq.dequeue();
      if (currentDist > dist.get(u)) continue;
      if (u === tgt) break;

      const neighbors = graphMap.get(u) || [];
      for (let edge of neighbors) {
        let alt = dist.get(u) + edge.weight;
        if (alt < dist.get(edge.to)) {
          dist.set(edge.to, alt);
          prev.set(edge.to, u);
          pq.enqueue(edge.to, alt);
        }
      }
    }

    if (dist.get(tgt) === Infinity) return { path: [], distance: Infinity };

    const path = [];
    let curr = tgt;
    while (curr !== null) {
      path.unshift(curr);
      curr = prev.get(curr);
    }
    return { path, distance: dist.get(tgt) };
  };

  // 2. Prim's Minimum Spanning Tree Algorithm
  const runPrimsMST = () => {
    const visited = new Set([startDepot]);
    const mstEdges = [];
    let totalWeight = 0;

    while (visited.size < GRAPH_NODES.length) {
      let minEdge = null;
      let minW = Infinity;

      for (let u of visited) {
        const neighbors = graphMap.get(u) || [];
        for (let edge of neighbors) {
          if (!visited.has(edge.to) && edge.weight < minW) {
            minW = edge.weight;
            minEdge = { from: u, to: edge.to, weight: edge.weight };
          }
        }
      }

      if (!minEdge) break;
      visited.add(minEdge.to);
      mstEdges.push(minEdge);
      totalWeight += minEdge.weight;
    }

    return { mstEdges, totalWeight: totalWeight.toFixed(2) };
  };

  // 3. Bellman-Ford Shortest Path Algorithm (DP Edge Relaxation)
  const runBellmanFord = (src) => {
    const dist = new Map();
    const prev = new Map();

    GRAPH_NODES.forEach(n => {
      dist.set(n.id, Infinity);
      prev.set(n.id, null);
    });
    dist.set(src, 0);

    // Relax edges |V| - 1 times
    for (let i = 0; i < GRAPH_NODES.length - 1; i++) {
      GRAPH_EDGES.forEach(([u, v, w]) => {
        if (dist.get(u) + w < dist.get(v)) {
          dist.set(v, dist.get(u) + w);
          prev.set(v, u);
        }
        if (dist.get(v) + w < dist.get(u)) {
          dist.set(u, dist.get(v) + w);
          prev.set(u, v);
        }
      });
    }

    return { dist, prev };
  };

  // 4. Graph Traversal Algorithms (BFS & DFS)
  const runBFS = (src) => {
    const visited = new Set([src]);
    const queue = [src];
    const order = [];

    while (queue.length > 0) {
      const u = queue.shift();
      order.push(u);
      const neighbors = graphMap.get(u) || [];
      for (let edge of neighbors) {
        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          queue.push(edge.to);
        }
      }
    }
    return order;
  };

  const runDFS = (src) => {
    const visited = new Set();
    const order = [];

    const dfsHelper = (u) => {
      visited.add(u);
      order.push(u);
      const neighbors = graphMap.get(u) || [];
      for (let edge of neighbors) {
        if (!visited.has(edge.to)) {
          dfsHelper(edge.to);
        }
      }
    };
    dfsHelper(src);
    return order;
  };

  // 5. 0/1 Knapsack Bag Optimization Algorithm (Dynamic Programming)
  const knapsackResult = useMemo(() => {
    const N = FOOD_ITEMS.length;
    const W = bagCapacity;
    const dp = Array.from({ length: N + 1 }, () => Array(W + 1).fill(0));

    for (let i = 1; i <= N; i++) {
      const item = FOOD_ITEMS[i - 1];
      for (let w = 0; w <= W; w++) {
        if (item.weight <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - item.weight] + item.price);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    let w = W;
    const selectedItems = [];
    for (let i = N; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        const item = FOOD_ITEMS[i - 1];
        selectedItems.push(item);
        w -= item.weight;
      }
    }

    const totalVal = dp[N][W];
    const totalW = selectedItems.reduce((acc, it) => acc + it.weight, 0);

    return { maxProfit: totalVal, totalWeight: totalW, items: selectedItems, matrix: dp };
  }, [bagCapacity]);

  // Handle Algorithm Execution
  useEffect(() => {
    if (algorithm === 'dijkstra') {
      const target = selectedStops[0] !== undefined ? selectedStops[0] : 5;
      const res = runDijkstra(startDepot, target);
      setOptimizedResult({
        type: 'Dijkstra Shortest Path',
        path: res.path,
        cost: res.distance.toFixed(2) + ' km'
      });
    } else if (algorithm === 'prims') {
      const mst = runPrimsMST();
      setOptimizedResult({
        type: "Prim's Minimum Spanning Tree",
        edges: mst.mstEdges,
        cost: mst.totalWeight + ' km (Total Network)'
      });
    } else if (algorithm === 'bellman') {
      const bf = runBellmanFord(startDepot);
      const target = selectedStops[0] !== undefined ? selectedStops[0] : 5;
      let path = [];
      let curr = target;
      while (curr !== null) {
        path.unshift(curr);
        curr = bf.prev.get(curr);
      }
      setOptimizedResult({
        type: 'Bellman-Ford DP Shortest Path',
        path,
        cost: bf.dist.get(target).toFixed(2) + ' km'
      });
    } else if (algorithm === 'bfs') {
      const bfsOrder = runBFS(startDepot);
      setOptimizedResult({
        type: 'Breadth-First Search (BFS Layer Traversal)',
        path: bfsOrder,
        cost: `${bfsOrder.length} Nodes Discovered`
      });
    } else if (algorithm === 'dfs') {
      const dfsOrder = runDFS(startDepot);
      setOptimizedResult({
        type: 'Depth-First Search (DFS Branch Traversal)',
        path: dfsOrder,
        cost: `${dfsOrder.length} Nodes Discovered`
      });
    }
  }, [startDepot, selectedStops, algorithm]);

  // Cart operations
  const addToCart = (food) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...food, quantity: 1 }];
    });
    showToast(`${food.name} added to cart!`);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
  const deliveryFee = cart.length > 0 ? 25 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: "RE-" + Math.floor(100000 + Math.random() * 900000),
      customerName: checkoutForm.name,
      phone: checkoutForm.phone,
      address: checkoutForm.address,
      items: [...cart],
      total: cartTotal,
      status: "Placed",
      createdAt: new Date().toISOString()
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    setCheckoutForm({ name: '', phone: '', address: '', payment: 'Cash on Delivery' });
    setActiveTab('orders');
    showToast(`Order ${newOrder.id} successfully placed!`);
  };

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const q = searchQuery.toLowerCase();
      const matchSearch = r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q);
      const matchCategory = selectedCategory === 'All' || r.category === selectedCategory;
      let matchFilter = true;
      if (activeFilter === 'Vegetarian') matchFilter = r.vegetarian;
      if (activeFilter === 'Fast') matchFilter = r.time <= 22;
      if (activeFilter === 'Rating') matchFilter = r.rating >= 4.5;
      return matchSearch && matchCategory && matchFilter;
    });
  }, [searchQuery, selectedCategory, activeFilter]);

  const dashboardStats = useMemo(() => {
    const totalOrdersCount = orders.length;
    const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
    const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
    const avgOrderValue = totalOrdersCount > 0 ? (totalSales / totalOrdersCount).toFixed(0) : 0;
    
    const chartData = [
      { day: 'Mon', revenue: 1420, orders: 12 },
      { day: 'Tue', revenue: 1890, orders: 15 },
      { day: 'Wed', revenue: 2300, orders: 18 },
      { day: 'Thu', revenue: 1780, orders: 14 },
      { day: 'Fri', revenue: 2890, orders: 24 },
      { day: 'Sat', revenue: 3450, orders: 29 },
      { day: 'Sun', revenue: totalSales + 1200, orders: totalOrdersCount + 10 }
    ];

    return { totalOrdersCount, deliveredCount, totalSales, avgOrderValue, chartData };
  }, [orders]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} font-sans flex flex-col transition-colors duration-200`}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR */}
      <header className={`sticky top-0 z-40 border-b ${isDarkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'} backdrop-blur-md px-4 lg:px-8 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-100 rounded-lg"
          >
            <MenuIcon className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 text-white p-2.5 rounded-xl shadow-lg shadow-emerald-600/20">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-1">
                Route<span className="text-orange-500">Eats</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">DSA Core</span>
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Graphs & Dynamic Programming Platform</p>
            </div>
          </div>
        </div>

        {/* Global Live Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search outlets, dishes, or graph vertices..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-sm rounded-xl outline-none transition border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-emerald-500' 
                : 'bg-gray-100 border-gray-200 text-gray-900 focus:border-emerald-600'
            }`}
          />
        </div>

        {/* Actions & Launcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sector 35 Hub</span>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-amber-400 hover:bg-gray-700' 
                : 'bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className="relative px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center gap-2 text-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cart.length > 0 && (
              <span className="bg-orange-500 text-white text-[11px] px-1.5 py-0.2 rounded-full font-black">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* DASHBOARD BODY CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP SIDEBAR NAVIGATION */}
        <aside className={`w-64 border-r hidden lg:flex flex-col p-4 space-y-6 ${isDarkMode ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-gray-500">Delivery Ops</div>
            
            {[
              { id: 'restaurants', label: 'Outlets Directory', icon: Utensils },
              { id: 'menu', label: 'Food Catalogue', icon: ShoppingBag },
              { id: 'optimizer', label: 'Route Visualizer', icon: Navigation },
              { id: 'orders', label: 'Active Orders', icon: Clock }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1 pt-4 border-t border-gray-800">
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-gray-500">DSA Engineering</div>
            
            {[
              { id: 'knapsack', label: '0/1 Knapsack Bag', icon: Cpu },
              { id: 'dashboard', label: 'Analytics Dashboard', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Quick System Metric Card */}
          <div className="mt-auto p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-teal-950/20 border border-emerald-800/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>DSA Solvers Active</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">Graph adjacency list loaded with 10 nodes & 17 weighted edges.</p>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* TAB 1: RESTAURANTS DIRECTORY */}
            {activeTab === 'restaurants' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">Food Outlets</h2>
                    <p className="text-xs text-gray-400">Select outlets to order or configure as Graph Depots</p>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {['All', 'Indian', 'Pizza', 'Burger', 'Chinese', 'Dessert', 'Healthy'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                          selectedCategory === cat
                            ? 'bg-emerald-600 text-white shadow-md'
                            : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredRestaurants.map(restaurant => (
                    <div 
                      key={restaurant.id}
                      className={`rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col justify-between`}
                    >
                      <div>
                        <div className="relative h-44 w-full overflow-hidden">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                          />
                          <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-400">
                            {restaurant.vegetarian ? "🌿 100% Veg" : "🍴 Mixed"}
                          </div>
                          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h3 className="font-extrabold text-lg leading-tight">{restaurant.name}</h3>
                          <p className="text-xs text-emerald-500 font-semibold">{restaurant.cuisine}</p>
                          <p className="text-xs text-gray-400 line-clamp-2">{restaurant.description}</p>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-emerald-500" />
                          {restaurant.time} mins
                        </span>
                        <button
                          onClick={() => setActiveTab('menu')}
                          className="px-3 py-1.5 bg-emerald-600/10 text-emerald-400 font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition flex items-center gap-1"
                        >
                          View Menu <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: FOOD MENU */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black">Food Menu</h2>
                  <p className="text-xs text-gray-400">Items tagged with price and weight parameters for 0/1 Knapsack optimization</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FOOD_ITEMS.map(food => (
                    <div 
                      key={food.id}
                      className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} flex gap-4 items-center`}
                    >
                      <img src={food.image} alt={food.name} className="w-28 h-28 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${food.veg ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-red-400 border-red-500/30 bg-red-500/10'}`}>
                              {food.veg ? 'VEG' : 'NON-VEG'}
                            </span>
                            <span className="text-[10px] text-orange-400 font-bold">Weight: {food.weight} kg</span>
                          </div>
                          <h4 className="font-bold text-base mt-1">{food.name}</h4>
                          <p className="text-xs text-gray-400 line-clamp-1">{food.desc}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-lg font-black text-emerald-400">₹{food.price}</span>
                          <button
                            onClick={() => addToCart(food)}
                            className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 transition flex items-center gap-1 shadow"
                          >
                            <Plus className="w-4 h-4" /> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: INTERACTIVE ROUTE & GRAPH OPTIMIZER */}
            {activeTab === 'optimizer' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black flex items-center gap-2">
                      <Navigation className="w-6 h-6 text-emerald-500" />
                      Graph Route Engine Visualizer
                    </h2>
                    <p className="text-xs text-gray-400">Visualizing Shortest-Path, Spanning Trees, and Network Traversals</p>
                  </div>

                  {/* Algorithm Selector Switcher */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {[
                      { id: 'dijkstra', label: "Dijkstra Shortest Path" },
                      { id: 'prims', label: "Prim's MST" },
                      { id: 'bellman', label: "Bellman-Ford DP" },
                      { id: 'bfs', label: "BFS Traversal" },
                      { id: 'dfs', label: "DFS Traversal" }
                    ].map(alg => (
                      <button
                        key={alg.id}
                        onClick={() => setAlgorithm(alg.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                          algorithm === alg.id
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                            : isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {alg.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Interactive SVG Canvas */}
                  <div className={`lg:col-span-2 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} p-4 relative overflow-hidden shadow-inner`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="w-4 h-4 animate-pulse" /> Live Graph Canvas
                      </span>
                      <span className="text-[11px] text-gray-500 font-mono">Vertices: 10 | Edges: 17</span>
                    </div>

                    <svg viewBox="0 0 520 460" className="w-full h-auto">
                      {/* Base Network Edges */}
                      {GRAPH_EDGES.map(([u, v, w], idx) => {
                        const nodeU = GRAPH_NODES.find(n => n.id === u);
                        const nodeV = GRAPH_NODES.find(n => n.id === v);
                        return (
                          <g key={idx}>
                            <line
                              x1={nodeU.x}
                              y1={nodeU.y}
                              x2={nodeV.x}
                              y2={nodeV.y}
                              stroke={isDarkMode ? '#374151' : '#cbd5e1'}
                              strokeWidth="2"
                              strokeDasharray="4 4"
                            />
                            <text
                              x={(nodeU.x + nodeV.x) / 2}
                              y={(nodeU.y + nodeV.y) / 2 - 4}
                              fill={isDarkMode ? '#9ca3af' : '#64748b'}
                              fontSize="10"
                              textAnchor="middle"
                            >
                              {w}k
                            </text>
                          </g>
                        );
                      })}

                      {/* Highlighted Prim's MST Edges */}
                      {algorithm === 'prims' && optimizedResult?.edges?.map((edge, idx) => {
                        const nodeU = GRAPH_NODES.find(n => n.id === edge.from);
                        const nodeV = GRAPH_NODES.find(n => n.id === edge.to);
                        return (
                          <line
                            key={`mst-${idx}`}
                            x1={nodeU.x}
                            y1={nodeU.y}
                            x2={nodeV.x}
                            y2={nodeV.y}
                            stroke="#f59e0b"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="animate-pulse"
                          />
                        );
                      })}

                      {/* Highlighted Path overlay */}
                      {algorithm !== 'prims' && optimizedResult?.path && optimizedResult.path.map((nodeId, idx) => {
                        if (idx === 0) return null;
                        const prevNode = GRAPH_NODES.find(n => n.id === optimizedResult.path[idx - 1]);
                        const currNode = GRAPH_NODES.find(n => n.id === nodeId);
                        return (
                          <line
                            key={`path-${idx}`}
                            x1={prevNode.x}
                            y1={prevNode.y}
                            x2={currNode.x}
                            y2={currNode.y}
                            stroke="#10b981"
                            strokeWidth="5"
                            strokeLinecap="round"
                            className="animate-pulse"
                          />
                        );
                      })}

                      {/* Vertices / Nodes */}
                      {GRAPH_NODES.map(node => {
                        const isDepot = node.id === startDepot;
                        const isVisited = optimizedResult?.path?.includes(node.id);

                        let fillColor = isDarkMode ? "#1f2937" : "#ffffff";
                        let strokeColor = "#6b7280";

                        if (isDepot) {
                          fillColor = "#10b981";
                          strokeColor = "#059669";
                        } else if (isVisited) {
                          fillColor = "#f97316";
                          strokeColor = "#ea580c";
                        }

                        return (
                          <g 
                            key={node.id} 
                            onClick={() => {
                              if (!isDepot) {
                                setSelectedStops([node.id]);
                              }
                            }}
                            className="cursor-pointer"
                          >
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={isDepot ? 15 : 10}
                              fill={fillColor}
                              stroke={strokeColor}
                              strokeWidth="3"
                              className="transition-all duration-300 hover:scale-125"
                            />
                            {isDepot && (
                              <text x={node.x} y={node.y + 4} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">R</text>
                            )}
                            <text
                              x={node.x}
                              y={node.y + 24}
                              fill={isDarkMode ? '#e5e7eb' : '#1f2937'}
                              fontSize="10"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {node.name.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="flex items-center justify-around pt-3 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Depot Outlet</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Target Delivery</span>
                      <span className="flex items-center gap-1.5"><span className="w-4 h-1.5 bg-emerald-500 rounded-full"></span> Path</span>
                    </div>
                  </div>

                  {/* Algorithmic Controls Panel */}
                  <div className={`space-y-4 p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <h3 className="font-extrabold text-base flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-emerald-500" /> Control Parameters
                    </h3>

                    <div>
                      <label className="text-xs font-bold text-gray-400 block mb-1">Source Outlet (Vertex $S$)</label>
                      <select
                        value={startDepot}
                        onChange={e => setStartDepot(Number(e.target.value))}
                        className={`w-full p-2.5 rounded-xl border text-xs outline-none ${
                          isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-200 text-gray-900'
                        }`}
                      >
                        {GRAPH_NODES.filter(n => n.type === 'depot').map(n => (
                          <option key={n.id} value={n.id}>{n.name}</option>
                        ))}
                      </select>
                    </div>

                    {optimizedResult && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
                        <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Solution Output</span>
                        <h4 className="font-extrabold text-emerald-300">{optimizedResult.type}</h4>
                        <div className="flex justify-between text-gray-300 pt-1">
                          <span>Total Distance / Value:</span>
                          <span className="font-bold text-emerald-400">{optimizedResult.cost}</span>
                        </div>
                        {optimizedResult.path && (
                          <div className="text-[11px] text-gray-400 pt-1">
                            <span className="font-bold block">Vertex Sequence:</span>
                            <span>{optimizedResult.path.map(id => GRAPH_NODES.find(n => n.id === id).name.split(' ')[0]).join(' ➔ ')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB 4: 0/1 KNAPSACK BAG OPTIMIZER */}
            {activeTab === 'knapsack' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-emerald-500" />
                    0/1 Knapsack Bag Optimization (Dynamic Programming)
                  </h2>
                  <p className="text-xs text-gray-400">Maximizing delivery value inside a fixed weight capacity bag</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Slider & Bag Config */}
                  <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
                    <h3 className="font-bold text-base">Rider Bag Capacity ($W$)</h3>
                    
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span>Max Capacity:</span>
                        <span className="text-orange-500 text-sm font-black">{bagCapacity} kg</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="12" 
                        value={bagCapacity} 
                        onChange={e => setBagCapacity(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-gray-800/50 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Weight Packed:</span>
                        <span className="font-bold">{knapsackResult.totalWeight} / {bagCapacity} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Maximized Payout:</span>
                        <span className="font-black text-emerald-400 text-base">₹{knapsackResult.maxProfit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Items via DP Backtracking */}
                  <div className={`lg:col-span-2 p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
                    <h3 className="font-bold text-base">DP Optimal Packed Items</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {knapsackResult.items.map(item => (
                        <div key={item.id} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center text-xs">
                          <div>
                            <h4 className="font-extrabold text-emerald-300">{item.name}</h4>
                            <span className="text-[10px] text-gray-400">Weight: {item.weight} kg</span>
                          </div>
                          <span className="font-black text-emerald-400">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 5: ORDERS TRACKER */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black">Active Delivery Orders</h2>
                  <span className="text-xs text-gray-400">{orders.length} placed</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map(order => (
                    <div key={order.id} className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
                      <div className="flex justify-between items-start border-b border-gray-800 pb-3">
                        <div>
                          <span className="font-black text-sm">{order.id}</span>
                          <p className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-gray-400">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-bold text-gray-200">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-gray-800 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Grand Total</span>
                          <span className="text-base font-black text-emerald-400">₹{order.total}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: ANALYTICS DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black">Analytics & Performance</h2>
                  <p className="text-xs text-gray-400">Delivery system metrics and gross revenue visualization</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Orders</span>
                    <div className="text-2xl font-black mt-1">{dashboardStats.totalOrdersCount}</div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Delivered</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{dashboardStats.deliveredCount}</div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Gross Volume</span>
                    <div className="text-2xl font-black text-orange-500 mt-1">₹{dashboardStats.totalSales}</div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Avg Order</span>
                    <div className="text-2xl font-black mt-1">₹{dashboardStats.avgOrderValue}</div>
                  </div>
                </div>

                {/* Recharts Bar Chart */}
                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
                  <h3 className="font-bold text-base">Weekly Revenue</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardStats.chartData}>
                        <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                        <Tooltip contentStyle={{ background: isDarkMode ? '#111827' : '#ffffff', borderRadius: '12px', fontSize: '12px' }} />
                        <Bar dataKey="revenue" fill="#059669" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CART VIEW */}
            {activeTab === 'cart' && (
              <div className="space-y-6 max-w-xl mx-auto">
                <h2 className="text-2xl font-black">Delivery Cart</h2>

                {cart.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto opacity-30" />
                    <p className="text-sm">Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} flex justify-between items-center`}>
                        <div>
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <span className="text-xs text-emerald-400 font-extrabold">₹{item.price}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-xl">
                          <button onClick={() => updateCartQty(item.id, -1)}><Minus className="w-4 h-4" /></button>
                          <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQty(item.id, 1)}><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => setIsCheckoutOpen(true)}
                      className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-500 transition"
                    >
                      Proceed to Checkout (₹{cartTotal})
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} space-y-4`}>
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-lg">Checkout Details</h3>
              <button onClick={() => setIsCheckoutOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.name}
                  onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={checkoutForm.phone}
                  onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Address</label>
                <textarea
                  required
                  rows="2"
                  value={checkoutForm.address}
                  onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className={`w-full p-3 rounded-xl border outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}
                />
              </div>
              <button type="submit" className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-500 transition">
                Confirm Order (₹{cartTotal})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAV */}
      <nav className={`lg:hidden border-t ${isDarkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'} backdrop-blur-md px-4 py-2 flex justify-around items-center z-40`}>
        {[
          { id: 'restaurants', label: 'Outlets', icon: Utensils },
          { id: 'menu', label: 'Menu', icon: ShoppingBag },
          { id: 'optimizer', label: 'Route', icon: Navigation },
          { id: 'knapsack', label: 'Bag DP', icon: Cpu },
          { id: 'orders', label: 'Orders', icon: Clock }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              activeTab === tab.id ? 'text-emerald-500' : 'text-gray-400'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}