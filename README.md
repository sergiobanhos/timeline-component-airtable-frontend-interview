# Airtable Timeline Component

A React-based timeline visualization component that displays events in horizontal lanes with space-efficient layout and interactive features.

## How to Build and Run

1. Clone the repository `git clone https://github.com/sergiobanhos/timeline-component-airtable-frontend-interview.git`
2. Navigate to the project directory `cd timeline-component-airtable-frontend-interview`
3. Install dependencies: `pnpm install` (or `npm install`)
4. Start the development server: `pnpm start` (or `npm start`)
5. Open your browser to view the timeline component with sample data

## Features Implemented

### Core Requirements
- Events arranged in compact, space-efficient lanes
- Items positioned based on YYYY-MM-DD date strings
- Uses provided `assignLanes.js` for efficient space utilization

### Enhanced Features
- Zoom in/out with mouse wheel (Ctrl + Scroll) or buttons
- Drag left/right edges to change start/end dates
- Double-click event names to edit them
- LocalStorage integration for data persistence
- Adaptive layout for different screen sizes
- Modern sidebar, header, and footer with statistics

## Technical Architecture

### Component Structure
- React Context for state management and data sharing
- Custom Hooks - `useZoom`, `useEvents` for encapsulated logic
- Modular Components - Separate components for timeline items, markers, and controls
- Utility Functions - Date calculations and event positioning logic

### Key Design Decisions
- Centralized state management for timeline data
- Reusable logic encapsulation
- Utility-first styling approach
- Automatic data persistence with error handling

## What I Like About My Implementation

- Timeline component built with React Context for clean data sharing
- When zoomed out, date labels group into week ranges for better readability
- LocalStorage integration ensures user changes are saved between sessions
- React hooks pattern keeps code organized and maintainable
- Sidebar navigation, statistics footer, and intuitive controls
- Graceful fallbacks for localStorage and date parsing issues

## What I Would Change If Doing It Again

- Interface for adding events directly in the timeline
- Modal or panel for viewing/editing comprehensive event information
- Alternative list visualization alongside timeline view
- Better mobile experience with touch interactions
- Create an infinite date range system for the timeline, allowing the user to scroll to any date
- Full keyboard accessibility support
- Add the horizontal scroll for the timeline on mouse wheel

## Design Decision Process

I researched timeline components in project management applications, particularly:
- Jira Timeline - For lane-based layout and zoom interactions
- ClickUp Gantt - For event editing and visual hierarchy

Key inspirations:
- Horizontal scrolling with fixed date headers
- Color-coded events with hover states
- Resize handles on event edges
- Statistics and control panels

## Testing Strategy (Given More Time)

### Data Testing
- Test with events spanning multiple years
- Single-day events, overlapping events, very long events
- Performance testing with 100+ events

### Interaction Testing
- Test zoom limits and smooth transitions
- Validate date constraints and visual feedback
- Test inline editing with various input scenarios

### Browser Testing
- Cross-browser compatibility - Chrome, Firefox, Safari testing
- Responsive behavior - Mobile and tablet layout validation
- Test with storage disabled/full scenarios

### Accessibility Testing
- Full keyboard-only interaction testing
- ARIA labels and semantic markup
- Ensure sufficient contrast ratios

### Help from AI
- Ask AI to generate variaty of testing scenarios


## Implementation Highlights
- Efficient space utilization using provided algorithm
- Date markers adapt based on zoom level
- Dynamic calculation of events, lanes, and duration
- Intuitive event resizing with visual feedback
- Seamless integration between localStorage and React state
