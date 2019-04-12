# BitCoin Maximum Profit Analyzer

The solution reads data in the form of historical price list of bitcoin currencies provided by a currency exchange and finds out the best profit that would have been possibly made by
buying a currency at a given price and selling it later on the same day.

The solution consists of 2 separate projects: 
1. React Web front-end
2. Spring Boot REST API back-end

## React Web Front-end
Source code: https://github.com/azamabdulrahim/nabtest/tree/master/bitcointool-client

The application provides a form where users can select a bitcoin currency and a date to find out the best possible profit from a complete transaction made on that date.

### Library Used
1. React
2. Redux
3. Bootstrap
4. Enzyme (for testing)

### Sample Data
Sample data is available for 07/05/2018 and 08/05/2018.

## Spring Boot REST API Back-end
Source code: https://github.com/azamabdulrahim/nabtest/tree/master/bitcointool

The back-end is a RESTful Web Service that provides the following endpoints:
1. /api/history/all - returns all currency price data available in the database
2. /api/history/{date:yyyymmdd} - returns raw currency price data filtered by the supplied {date}
3. /api/history/{date:yyyymmdd}/{currency} - returns raw currency price data filtered by the supplied {date} and {currency}
4. /api/history/getBestProfit/{date:yyyymmdd} - returns the best possible profit for all currencies filtered by the supplied {date}
5. /api/history/getBestProfit/{date:yyyymmdd}/{currency} - returns the best possible profit filtered by the supplied {date} and {currency}

## Database
The bitcoin currency price data is stored in MongoDB Atlas.
Sample data is available for 07/05/2018 and 08/05/2018.