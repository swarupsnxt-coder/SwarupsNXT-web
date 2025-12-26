import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
```

4. Click **"Commit changes"** → **"Commit changes"**

---

### **Step 5: Create/Update `.gitignore` File**

**Check if you already have a `.gitignore` file:**
- Look in your file list for a file called `.gitignore`

**If you DON'T have it:**
1. Click **"Add file"** → **"Create new file"**
2. Name it: `.gitignore`
3. Paste this:
```
node_modules/
dist/
.env
*.log
.DS_Store
```

4. Click **"Commit changes"** → **"Commit changes"**

**If you DO have it:**
1. Click on the `.gitignore` file
2. Click the **pencil icon** (✏️) to edit
3. Add these lines at the bottom if they're not already there:
```
node_modules/
dist/
.env
