# Supabase 集成指南

## 🚀 快速开始

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 点击 "Start your project"
3. 创建新项目，记住你的项目密码

### 2. 获取项目配置

在 Supabase 项目仪表板中：

1. 进入 `Settings` → `API`
2. 复制以下信息：
   - `Project URL`
   - `anon public` key

### 3. 配置环境变量

1. 复制 `.env.local.example` 为 `.env.local`
2. 填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 初始化数据库

1. 在 Supabase 仪表板中，进入 `SQL Editor`
2. 复制 `scripts/init-database.sql` 中的内容
3. 粘贴并执行 SQL 脚本

### 5. 配置认证

在 Supabase 仪表板中：

1. 进入 `Authentication` → `Settings`
2. 在 `Site URL` 中添加：`http://localhost:3000`
3. 在 `Redirect URLs` 中添加：`http://localhost:3000/auth/callback`

### 6. 启动项目

```bash
npm run dev
```

## 📊 数据库结构

### 表结构

- **services**: 服务信息表
- **bookings**: 预约信息表  
- **user_profiles**: 用户资料表（扩展 auth.users）

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

## 🔧 功能特性

### ✅ 已实现功能

- **用户认证**
  - 邮箱密码注册/登录
  - 自动会话管理
  - 用户资料管理

- **服务管理**
  - 服务列表展示
  - 服务详情查看

- **预约系统**
  - 创建预约
  - 查看我的预约
  - 取消预约
  - 时间冲突检测

- **安全特性**
  - 行级安全策略 (RLS)
  - 用户数据隔离
  - 自动用户资料创建

### 🔄 实时功能

项目已配置 Supabase 实时订阅，支持：
- 预约状态实时更新
- 服务信息实时同步

## 🛠️ 开发指南

### API 使用

```javascript
// 获取服务列表
import { useServices } from '../hooks/useServices'
const { services, loading, error } = useServices()

// 预约管理
import { useBookings } from '../hooks/useBookings'
const { bookings, createBooking, cancelBooking } = useBookings()

// 用户认证
import { useAuth } from '../hooks/useAuth'
const { user, login, register, logout } = useAuth()
```

### 数据库操作

```javascript
import { servicesAPI, bookingsAPI, usersAPI } from '../utils/database'

// 创建预约
const booking = await bookingsAPI.create({
  serviceId: 'service-id',
  date: '2024-01-01',
  time: '10:00',
  notes: '备注信息'
})
```

## 🔒 安全配置

### 行级安全策略

- 用户只能访问自己的预约和资料
- 所有用户都可以查看服务信息
- 自动数据隔离和权限控制

### 环境变量安全

- 敏感信息存储在 `.env.local`
- 不要将 `.env.local` 提交到版本控制

## 📝 注意事项

1. **邮箱验证**: 默认启用邮箱验证，用户注册后需要验证邮箱
2. **生产环境**: 部署前记得更新 Site URL 和 Redirect URLs
3. **数据备份**: 定期备份 Supabase 数据库
4. **API 限制**: 注意 Supabase 免费计划的使用限制

## 🆘 常见问题

### Q: 用户注册后无法登录？
A: 检查是否启用了邮箱验证，用户需要先验证邮箱才能登录。

### Q: 数据库连接失败？
A: 检查 `.env.local` 中的 Supabase URL 和 API Key 是否正确。

### Q: 预约创建失败？
A: 确保用户已登录，且数据库表已正确创建。

## 📞 技术支持

如有问题，请查看：
- [Supabase 官方文档](https://supabase.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- 项目 GitHub Issues