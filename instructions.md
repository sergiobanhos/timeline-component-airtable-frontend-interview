# Airtable timeline assignment

## Expected implementation time:

4 hours

## High level objective:

Design and implement a component for visualizing items on a timeline.

## Details:

Your timeline component should arrange items in horizontal lanes. These items should be laid out in a compact, space-efficient way: if item A ends before item B starts, they can share a lane instead of being rendered on separate lanes. You may want to slightly relax this constraint to fit in the name of the event (for example, if an item is too short, or the item’s name is too long).

The start and end dates will be formatted as YYYY-MM-DD date strings, for example: `2025-02-20`. You don’t need to worry about hours, minutes, seconds, or time zones. You can assume every item’s end date is the same or later than its start date.

To help you implement the compact lanes, we’ve provided you with `src/assignLanes.js`. Feel free to modify and use this code however you like.

You are welcome to use general purpose libraries (Moment, UI primitive libraries, etc.), but you should avoid using libraries that solve too much of the problem (i.e. renders a timeline).

In addition to rendering the timeline, use whatever time you have remaining to implement any of the following enhancements:

- Allow zooming in and out of the timeline
- Allow dragging and dropping to change the start and/or end date of an item
- Allow editing the name of items inline
- Any other polish or useful enhancements you can think of

Include a README that covers:

- What you like about your implementation.
- What you would change if you were going to do it again.
- How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
- How you would test this if you had more time.

If you did not use the starter code, please also include instructions on how to build and run your project so we can see and interact with the timeline component you built. It should render the sample data included in `src/timelineItems.js`.

What we’re looking for:

- Clean, readable, maintainable code.
- A sensible user experience and design for the final product.

## Starter code:

1. Navigate to this project directory
2. Run `npm install` to install dependencies
3. Run `npm start` to initialize and connect to a node server with your default browser
4. Develop in your own local environment

Please feel free to use as much or as little of the starter code as you'd like.
