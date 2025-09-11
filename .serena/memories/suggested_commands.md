# Suggested Commands

## Development Commands
- `yarn dev` - Start development server
- `yarn build` - Build production application
- `yarn start` - Start production server
- `yarn lint` - Run ESLint for code linting

## System Commands (macOS)
- `ls` - List directory contents
- `cd` - Change directory
- `git` - Git version control
- `grep` - Search text patterns (prefer `rg` for better performance)
- `find` - Find files and directories
- `cat` - Display file contents
- `mkdir` - Create directories
- `cp` - Copy files
- `mv` - Move/rename files
- `rm` - Remove files

## Package Management
- `yarn install` - Install dependencies
- `yarn add <package>` - Add new dependency
- `yarn add -D <package>` - Add development dependency
- `yarn remove <package>` - Remove dependency

## Git Workflow
- `git status` - Check working directory status
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote repository
- `git pull` - Pull from remote repository
- `git branch` - List/create branches
- `git checkout <branch>` - Switch branches

## Testing & Quality
- Use `yarn lint` to check code quality
- No specific test commands configured yet
- Code formatting handled by Prettier integration

## Build & Deployment
- `yarn build` - Creates optimized production build
- Deployed automatically to Vercel
- Environment: Production builds ignore TypeScript/ESLint errors (configured in next.config.mjs)