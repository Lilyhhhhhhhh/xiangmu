# 美容院预约系统

一个基于 Next.js + Supabase 的现代化美容院预约管理系统。

## 🌟 功能特性

### ✅ 用户功能
- **用户认证**：邮箱密码注册/登录
- **服务浏览**：查看所有可用的美容服务
- **在线预约**：选择服务、日期和时间进行预约
- **预约管理**：查看、取消个人预约记录
- **响应式设计**：支持桌面端和移动端

### 🔧 技术特性
- **现代化框架**：Next.js 15 + React 19
- **后端服务**：Supabase（数据库 + 认证）
- **样式系统**：Tailwind CSS
- **状态管理**：React Context API
- **数据安全**：行级安全策略 (RLS)
- **实时功能**：预约状态实时更新

## 🚀 快速开始

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn
- Supabase 账户

### 2. 安装依赖
```bash
npm install
```

### 3. 配置 Supabase

#### 3.1 创建 Supabase 项目
1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 记住项目密码

#### 3.2 获取项目配置
在 Supabase 项目仪表板中：
1. 进入 `Settings` → `API`
2. 复制 `Project URL` 和 `anon public` key

#### 3.3 配置环境变量
```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 3.4 初始化数据库
1. 在 Supabase 仪表板中，进入 `SQL Editor`
2. 复制 `scripts/init-database.sql` 中的内容
3. 粘贴并执行 SQL 脚本

#### 3.5 配置认证
在 Supabase 仪表板中：
1. 进入 `Authentication` → `Settings`
2. 在 `Site URL` 中添加：`http://localhost:3000`
3. 在 `Redirect URLs` 中添加：`http://localhost:3000`

### 4. 启动项目
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📊 项目结构

```
xiangmu/
├── components/           # React 组件
│   ├── auth/            # 认证相关组件
│   ├── booking/         # 预约相关组件
│   ├── common/          # 通用组件
│   └── layout/          # 布局组件
├── hooks/               # 自定义 Hooks
│   ├── useAuth.js       # 认证管理
│   ├── useBookings.js   # 预约管理
│   ├── useServices.js   # 服务管理
│   └── useLocalStorage.js
├── lib/                 # 库配置
│   ├── supabase.js      # Supabase 客户端
│   └── supabase-server.js
├── pages/               # Next.js 页面
│   ├── booking/         # 预约相关页面
│   ├── index.js         # 首页（重定向到服务页）
│   ├── services.js      # 服务列表页
│   ├── login.js         # 登录页
│   ├── register.js      # 注册页
│   └── my-bookings.js   # 我的预约页
├── scripts/             # 数据库脚本
│   └── init-database.sql
├── styles/              # 样式文件
├── utils/               # 工具函数
│   └── database.js      # 数据库操作
└── README-SUPABASE.md   # Supabase 详细指南
```

## 🗄️ 数据库设计

### 主要数据表
- **services**：服务信息表
- **bookings**：预约记录表
- **user_profiles**：用户资料表

### 关系图
```
auth.users (Supabase Auth)
    ↓ (1:1)
user_profiles
    ↓ (1:N)
bookings
    ↓ (N:1)
services
```

## 🔒 安全特性

- **行级安全策略**：用户只能访问自己的数据
- **认证保护**：所有敏感操作需要登录
- **数据验证**：前后端双重数据验证
- **环境变量**：敏感配置信息安全存储

## 🎨 UI/UX 特性

- **现代化设计**：简洁美观的界面
- **响应式布局**：适配各种设备尺寸
- **交互反馈**：加载状态、成功/错误提示
- **用户友好**：直观的操作流程

## 📱 页面功能

### 服务页面 (`/services`)
- 展示所有可用服务
- 服务详情（价格、时长、描述）
- 直接跳转到预约流程

### 预约流程
1. **选择服务** (`/services`)
2. **选择时间** (`/booking`)
3. **确认预约** (`/booking/confirm`)

### 我的预约 (`/my-bookings`)
- 查看所有预约记录
- 预约状态管理
- 取消预约功能

## 🛠️ 开发指南

### 添加新服务
在 Supabase 的 `services` 表中插入新记录：
```sql
INSERT INTO services (name, description, duration_minutes, price, image_url) 
VALUES ('新服务', '服务描述', 60, 199.00, '/images/service.jpg');
```

### 自定义样式
项目使用 Tailwind CSS，可以在 `tailwind.config.js` 中自定义主题。

### API 使用示例
```javascript
// 获取服务列表
import { useServices } from '../hooks/useServices'
const { services, loading, error } = useServices()

// 创建预约
import { useBookings } from '../hooks/useBookings'
const { createBooking } = useBookings()
await createBooking({ serviceId, date, time })
```

## 🚀 部署指南

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 更新 Supabase 中的 Site URL

### 环境变量配置
生产环境需要配置：
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🆘 常见问题

### Q: 用户注册后无法登录？
A: 检查 Supabase 是否启用了邮箱验证，用户需要先验证邮箱。

### Q: 预约创建失败？
A: 确保用户已登录，且 Supabase RLS 策略配置正确。

### Q: 样式显示异常？
A: 检查 Tailwind CSS 是否正确配置和编译。

## 📞 技术支持

- [Supabase 文档](https://supabase.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 📄 许可证

MIT License

---

**开发者**: CodeBuddy  
**版本**: 1.0.0  
**最后更新**: 2024年1月