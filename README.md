# sales-dashboard

Simple sales record dashboard using VueJS + Axios and LocalStorage.
MySQL, NodeJS + Express REST API setup within a containerized backend. 

## Project setup

1. Make sure you have the sales-dashboard-api repo up and ready first.
2. Run `npm install`.
3. Serve localhost with `npm run serve`.

## Assumptions made

1. Fairly static (no high influx of data rows) and small dataset hence no pagination implemented. 
2. Monogamous user-device since session storage using LocalStorage and will not persist across devices.
3. UI scaled for lg to xl screen sizes due to time constraint.
4. Relatively small dataset hence the simple refresh mechanism without any performance optimizations in terms of using stream, Websocket etc. 
5. Filter settings are saved in the modal component but on-refresh dashboard will still query for all. 

## Recommendations to Product Owner

1. Filter modal component obscures the dashboard while selecting filter. Just the act of filtering occupies a lot of page real estate.
Recommendation: Have the filter component be a button in the top right that triggers expansion panels. User will only dropdown fields that they want to filter by. 

Free form textfields for date range input necessitates user's manual input. Involves extra steps in terms of validation and date formatting.
Recommendation: Easier for dev and better for user experience to use a v-date-picker instead of a free form input field. 