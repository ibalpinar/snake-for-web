# 🐍 Snake Game for Web

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

A modern, responsive implementation of the classic Snake game built with vanilla JavaScript, HTML5, and CSS3. Features smooth animations, local score tracking, and a clean, minimalist design.

## 🎮 Demo

**[Play Online](http://balpinar.com/)** - Access the game directly from the developer's homepage.

![Snake Game Preview](https://via.placeholder.com/600x400/a5f328/000000?text=Snake+Game+Screenshot)

## ✨ Features

- 🎯 **Classic Gameplay** - Traditional Snake mechanics with modern enhancements
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices  
- 🏆 **Score Tracking** - Local storage-based score history with timestamp
- ⚡ **Smooth Animations** - 60 FPS gameplay with interpolated movement
- 🎨 **Modern UI** - Clean, minimalist design with smooth transitions
- 🔄 **Instant Restart** - Quick game reset without page reload
- 💾 **Persistent Storage** - Scores saved locally across sessions

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended for optimal performance)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibalpinar/snake-for-web.git
   cd snake-for-web
   ```

2. **Option A: Using Python (Recommended)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

3. **Option B: Using Node.js**
   ```bash
   npx http-server
   ```

4. **Option C: Using NGINX (macOS with Homebrew)**
   ```bash
   brew install nginx
   # Copy files to NGINX root directory
   # Start NGINX service
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🎯 How to Play

1. **Start the Game**: Press any arrow key to begin
2. **Control the Snake**: Use arrow keys to navigate
   - ⬆️ **Up Arrow** - Move up
   - ⬇️ **Down Arrow** - Move down  
   - ⬅️ **Left Arrow** - Move left
   - ➡️ **Right Arrow** - Move right
3. **Objective**: Eat the green food items to grow and increase your score
4. **Avoid**: Hitting walls or your own tail
5. **Game Over**: Choose to restart or view your score history

## 🏗️ Project Structure

```
snake-for-web/
├── index.html              # Main HTML file
├── LICENSE.TXT             # MIT License
├── README.md               # Project documentation
├── src/                    # JavaScript source files
│   ├── core.js            # Main game loop and logic
│   ├── snake.js           # Snake entity management
│   ├── hunt.js            # Food/prey system
│   ├── input.js           # Keyboard input handling
│   ├── playground.js      # Game board utilities
│   └── gameParameters.js  # Game configuration
└── style/
    └── main.css           # Styling and animations
```

## ⚙️ Technical Details

### Architecture

- **Modular Design**: ES6 modules for clean code organization
- **Game Loop**: RequestAnimationFrame-based rendering at 60 FPS
- **Smooth Movement**: Interpolation-based animation system
- **State Management**: Centralized game state handling

### Key Components

| Component | Responsibility |
|-----------|---------------|
| `core.js` | Main game loop, collision detection, game state |
| `snake.js` | Snake movement, growth, rendering |
| `hunt.js` | Food spawning and consumption logic | 
| `input.js` | Keyboard event handling and direction management |
| `playground.js` | Game board utilities and boundary detection |
| `gameParameters.js` | Configuration constants |

### Performance Features

- **Frame Rate Control**: Consistent 60 FPS gameplay
- **Memory Efficient**: Minimal DOM manipulation
- **Smooth Animations**: CSS transforms with hardware acceleration
- **Optimized Rendering**: Only necessary elements are redrawn

## 🎨 Customization

### Game Parameters

Edit `src/gameParameters.js` to modify game behavior:

```javascript
export const GRID_SIZE = 51;        // Board size (51x51)
export const SNAKE_SPEED = 15;      // Movement speed
export const GROWTH_PARAMETER = 1;   // Segments added per food
```

### Styling

Customize appearance in `style/main.css`:

```css
:root {
  --grid-size: 51;
}

.snake {
  border: .25vmin solid rgb(219, 74, 74);
  background-color: hsl(355, 96%, 81%);
}

.hunt {
  border: .25vmin solid rgb(76, 177, 89);
  background-color: hsl(133, 89%, 58%);
}
```

## 🤝 Contributing

Contributions are welcome! This project follows a structured development workflow:

### Development Process

1. **Find an Issue**: Check the [Issues](https://github.com/ibalpinar/snake-for-web/issues) section
2. **Create Feature Branch**: `git checkout -b ISSUE-[number]`
3. **Commit Format**: `Add feature description [ISSUE-XX]`
4. **Pull Request**: Submit PR to `develop` branch

### Example Workflow

```bash
# 1. Fork and clone the repository
git clone https://github.com/[your-username]/snake-for-web.git

# 2. Create feature branch
git checkout -b ISSUE-20

# 3. Make changes and commit
git commit -m "Add new leaderboard feature [ISSUE-20]"

# 4. Push and create PR
git push origin ISSUE-20
```

### Code Style

- Use ES6+ features and modern JavaScript
- Follow existing naming conventions
- Add comments for complex logic
- Ensure responsive design compatibility

## 📋 Roadmap

- [ ] Mobile touch controls
- [ ] Multiple difficulty levels
- [ ] Online leaderboard
- [ ] Sound effects and music
- [ ] Power-ups and special items
- [ ] Customizable themes
- [ ] Multiplayer support

## 🐛 Known Issues

- Minor visual glitches on very slow devices
- Score popup may not display correctly on extremely small screens

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ibalpinar/snake-for-web/issues)
- **Developer**: [balpinar.com](http://balpinar.com/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.TXT](LICENSE.TXT) file for details.

## 🙏 Acknowledgments

- Created with love for a 6-year-old daughter to inspire interest in programming
- Built using vanilla web technologies for educational purposes
- Community contributions welcome and appreciated

---

**Free Software, Hell Yeah! 🎉**

> *"Teaching the next generation through code, one pixel at a time."*
