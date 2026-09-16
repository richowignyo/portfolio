export const caseStudies = {
  "bfi-finance-business-intelligence": {
    category: "Professional Experience",
    title: "BFI Finance — Business Intelligence",
    subtitle:
      "Booking value forecasting and business analysis developed during a Business Intelligence internship at PT BFI Finance Indonesia Tbk.",

    techStack: [
      "Python",
      "SQL",
      "XGBoost",
      "Time Series Forecasting",
      "Business Intelligence",
    ],
    dataDisclaimer:
      "Data yang digunakan dalam project ini merupakan data dummy/simulasi yang dibuat untuk keperluan portfolio. Data aktual/internal PT BFI Finance Indonesia Tbk tidak dipublikasikan.",
    visualizations: {
      title: "Key Visualizations",
      items: [
        {
          title: "Historical Booking Trend",
          description:
            "Daily booking value showed an overall upward trend across the historical period, with a significant disruption during 2020–2021 and stronger booking activity in subsequent years.",
          image: "/projects/bfi/historical-booking-trend.png",
        },
        {
          title: "Year-over-Year Growth",
          description:
            "Year-over-year growth highlights the sharp decline during 2020, followed by a strong recovery in subsequent years and a decline in 2025.",
          image: "/projects/bfi/yoy-growth.png",
        },
        {
          title: "Actual vs Forecast",
          description:
            "The forecast provides an estimate of daily booking value for August 2025 while capturing recurring weekly booking patterns.",
          image: "/projects/bfi/actual-vs-forecast.png",
        },
      ],
    },
    overview: {
      title: "Forecasting booking value for business planning",
      paragraphs: [
        "During my Business Intelligence internship at BFI Finance, I worked on a forecasting task focused on daily booking value for NDF Car.",
        "The objective was to build a forecasting pipeline that could capture historical booking patterns and provide an estimate of future daily booking values for business planning and monitoring.",
      ],
      stats: [
        {
          value: "3,865",
          label: "Daily observations",
        },
        {
          value: "2015–2025",
          label: "Historical period",
        },
      ],
    },

    problem: {
      title: "Turning historical booking data into a useful forecast",
      paragraphs: [
        "Booking value showed different patterns across days and periods, including recurring weekly behavior and changes in business activity over time.",
        "A forecasting approach was therefore developed to learn from historical booking values while incorporating time-related features that could help explain recurring patterns.",
      ],
    },

    data: {
      title: "Historical daily booking observations",
      paragraphs: [
        "The dataset contained 3,865 daily observations covering January 2015 through July 2025.",
        "Data preprocessing included handling missing values, converting the date field into a datetime format, and ensuring booking values were represented numerically.",
      ],
    },

    approach: {
      title: "From raw booking data to forecasting",
      steps: [
        {
          number: "01",
          title: "Preprocessing",
          description:
            "Prepared date and booking value fields and handled missing values.",
        },
        {
          number: "02",
          title: "Feature Engineering",
          description:
            "Created day-of-week, month, 7-day lag, and 7-day rolling mean features.",
        },
        {
          number: "03",
          title: "Modeling",
          description:
            "Built an XGBoost regression model for daily booking value forecasting.",
        },
        {
          number: "04",
          title: "Evaluation",
          description:
            "Used a chronological train-test split to evaluate forecasting performance on future observations.",
        },
      ],
    },

    model: {
      title: "XGBoost Regression",
      description:
        "XGBoost was used to model the relationship between historical booking patterns and the engineered time-based predictors.",
      parameters: [
        {
          label: "Max Depth",
          value: "5",
        },
        {
          label: "Learning Rate",
          value: "0.06",
        },
        {
          label: "N Estimators",
          value: "250",
        },
        {
          label: "Colsample Bytree",
          value: "0.9",
        },
      ],
    },

    results: {
      title: "Model performance on future booking data",
      description:
        "The model was evaluated using observations from January through July 2025 after training on historical data through December 2024.",
      metrics: [
        {
          value: "Rp11.49B",
          label: "RMSE",
        },
        {
          value: "Rp7.93B",
          label: "MAE",
        },
        {
          value: "13.23%",
          label: "MAPE",
        },
      ],
    },

    forecast: {
      title: "August 2025 forecast",
      range: "Rp30–60B",
      label: "Estimated daily booking value",
      period: "August 2025",
      paragraphs: [
        "The forecast for August 2025 generally ranged between approximately Rp30–60 billion per day, with Sundays remaining at zero based on the historical pattern.",
        "The forecast also showed a slight dip around the second week, providing an additional reference for business planning and monitoring.",
      ],
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "Data Preparation",
          description:
            "Prepared and structured historical booking data for forecasting.",
        },
        {
          title: "Feature Engineering",
          description:
            "Created time-based predictors including day-of-week, month, 7-day lag, and rolling mean.",
        },
        {
          title: "Forecasting Pipeline",
          description:
            "Developed the XGBoost-based forecasting workflow using Python.",
        },
        {
          title: "Analysis & Presentation",
          description:
            "Evaluated model performance and presented the forecasting results for business planning and monitoring.",
        },
      ],
    },

    evidence: {
      title: "Project documentation",
      description:
        "Selected documentation can be provided for further review.",
      link: "https://drive.google.com/file/d/1Ce4Rv5s3ipaPt1X48JH3O7QSE4r8hDXZ/view?usp=drive_link",
      linkLabel: "Project Files",
    },
  },
  "shallot-garlic-price-forecasting": {
    category: "Data Analysis / Thesis",
    title: "Shallot & Garlic Price Forecasting",
    subtitle:
      "Comparison of ARIMAX, SVR, and Hybrid ARIMAX-SVR for forecasting shallot and garlic prices in Central Java traditional markets.",

    techStack: [
      "Python",
      "ARIMAX",
      "SVR",
      "Machine Learning",
      "Time Series",
    ],

    overview: {
      title: "Forecasting shallot and garlic prices",
      paragraphs: [
        "This thesis compared three forecasting approaches—ARIMAX, SVR, and Hybrid ARIMAX-SVR—to forecast shallot and garlic prices in traditional markets in Central Java.",
        "The study incorporated historical market prices together with exogenous variables including wholesale prices, chili prices, and rainfall to evaluate their contribution to forecasting performance.",
      ],
      stats: [
        {
          value: "1,826",
          label: "Daily observations per commodity",
        },
        {
          value: "3",
          label: "Forecasting approaches",
        },
      ],
    },

    problem: {
      title: "Improving price forecasting with external factors",
      paragraphs: [
        "Shallot and garlic prices can fluctuate over time, making accurate forecasting important for understanding future price movements.",
        "The study therefore compared statistical, machine learning, and hybrid approaches while incorporating relevant external variables that may influence price behavior.",
      ],
    },

    data: {
      title: "Daily market price observations",
      paragraphs: [
        "The dataset consisted of daily shallot and garlic retail prices from traditional markets in Central Java.",
        "Additional variables included wholesale prices, chili prices, and rainfall. The data underwent preprocessing, stationarity analysis, feature engineering, and preparation for each forecasting approach.",
      ],
    },

    approach: {
      title: "From historical prices to forecasting models",
      steps: [
        {
          number: "01",
          title: "Data Preparation",
          description:
            "Prepared price and exogenous-variable data through preprocessing and exploratory analysis.",
        },
        {
          number: "02",
          title: "Feature Engineering",
          description:
            "Constructed lag-based features and prepared variables for statistical and machine learning models.",
        },
        {
          number: "03",
          title: "Modeling",
          description:
            "Developed ARIMAX, SVR, and Hybrid ARIMAX-SVR forecasting models.",
        },
        {
          number: "04",
          title: "Evaluation",
          description:
            "Compared forecasting performance using RMSE, MAE, and MAPE across different train-test split scenarios.",
        },
      ],
    },

    model: {
      title: "ARIMAX, SVR & Hybrid ARIMAX-SVR",
      description:
        "Three forecasting approaches were developed to compare statistical time-series modeling, machine learning, and a hybrid approach combining ARIMAX with SVR-based residual modeling.",
      parameters: [
        {
          label: "ARIMAX",
          value: "Time Series",
        },
        {
          label: "SVR",
          value: "Hyperparameter Tuned",
        },
        {
          label: "Hybrid",
          value: "ARIMAX + SVR",
        },
        {
          label: "Evaluation",
          value: "RMSE · MAE · MAPE",
        },
      ],
    },

    modelComparison: {
      title: "Model Comparison",
      description:
        "Forecasting performance was compared across three train-test split scenarios using RMSE, MAE, and MAPE.",

      shallot: {
        title: "Shallot",
        rows: [
          {
            scenario: "70:30",
            model: "ARIMAX (1,1,2)",
            rmse: "6,988.530",
            mae: "5,793.519",
            mape: "15.706%",
          },
          {
            scenario: "70:30",
            model: "SVR",
            rmse: "2,102.212",
            mae: "1,570.481",
            mape: "4.082%",
          },
          {
            scenario: "70:30",
            model: "Hybrid ARIMAX-SVR",
            rmse: "6,999.557",
            mae: "5,801.222",
            mape: "15.716%",
          },
          {
            scenario: "80:20",
            model: "ARIMAX (1,1,2)",
            rmse: "7,327.562",
            mae: "5,835.408",
            mape: "12.686%",
          },
          {
            scenario: "80:20",
            model: "SVR",
            rmse: "2,399.557",
            mae: "1,770.730",
            mape: "4.083%",
          },
          {
            scenario: "80:20",
            model: "Hybrid ARIMAX-SVR",
            rmse: "7,342.186",
            mae: "5,849.013",
            mape: "12.715%",
          },
          {
            scenario: "90:10",
            model: "ARIMAX (1,1,2)",
            rmse: "5,849.739",
            mae: "4,163.385",
            mape: "8.753%",
          },
          {
            scenario: "90:10",
            model: "SVR",
            rmse: "1,896.581",
            mae: "1,484.228",
            mape: "3.354%",
          },
          {
            scenario: "90:10",
            model: "Hybrid ARIMAX-SVR",
            rmse: "5,857.182",
            mae: "4,167.072",
            mape: "8.759%",
          },
        ],
      },

      garlic: {
        title: "Garlic",
        rows: [
          {
            scenario: "70:30",
            model: "ARIMAX (1,1,0)",
            rmse: "2,728.459",
            mae: "2,184.938",
            mape: "5.780%",
          },
          {
            scenario: "70:30",
            model: "SVR",
            rmse: "2,829.616",
            mae: "2,271.470",
            mape: "5.733%",
          },
          {
            scenario: "70:30",
            model: "Hybrid ARIMAX-SVR",
            rmse: "2,724.988",
            mae: "2,184.490",
            mape: "5.776%",
          },
          {
            scenario: "80:20",
            model: "ARIMAX (2,1,1)",
            rmse: "3,733.143",
            mae: "3,026.015",
            mape: "8.277%",
          },
          {
            scenario: "80:20",
            model: "SVR",
            rmse: "1,170.861",
            mae: "880.616",
            mape: "2.364%",
          },
          {
            scenario: "80:20",
            model: "Hybrid ARIMAX-SVR",
            rmse: "3,730.878",
            mae: "3,025.190",
            mape: "8.274%",
          },
          {
            scenario: "90:10",
            model: "ARIMAX (0,1,0)",
            rmse: "3,479.340",
            mae: "3,344.993",
            mape: "9.505%",
          },
          {
            scenario: "90:10",
            model: "SVR",
            rmse: "1,458.290",
            mae: "1,357.615",
            mape: "3.849%",
          },
          {
            scenario: "90:10",
            model: "Hybrid ARIMAX-SVR",
            rmse: "3,472.839",
            mae: "3,338.524",
            mape: "9.486%",
          },
        ],
      },
    },

    results: {
      title: "SVR achieved the strongest forecasting performance",
      description:
        "SVR consistently delivered the strongest forecasting performance across the evaluated scenarios, particularly for the best-performing split of each commodity.",
      metrics: [
        {
          value: "3.354%",
          label: "Shallot MAPE — 90:10",
        },
        {
          value: "2.364%",
          label: "Garlic MAPE — 80:20",
        },
        {
          value: "1,896.581",
          label: "Shallot RMSE — 90:10",
        },
        {
          value: "1,170.861",
          label: "Garlic RMSE — 80:20",
        },
      ],
    },

    visualizations: {
      title: "Key Visualizations",
      items: [
        {
          title: "Shallot Price Trend",
          description:
            "Historical daily price movement of shallots in Central Java traditional markets from 2021 to 2025.",
          image: "/projects/thesis/shallot-price-trend.png",
        },
        {
          title: "Garlic Price Trend",
          description:
            "Historical daily price movement of garlic in Central Java traditional markets from 2021 to 2025.",
          image: "/projects/thesis/garlic-price-trend.png",
        },
        {
          title: "SVR Forecast — 80:20",
          description:
            "Comparison between actual and SVR-predicted garlic prices under the 80:20 train-test split.",
          image: "/projects/thesis/svr-forecast-80-20.png",
        },
        {
          title: "SVR Forecast — 90:10",
          description:
            "Comparison between actual and SVR-predicted shallot prices under the 90:10 train-test split.",
          image: "/projects/thesis/svr-forecast-90-10.png",
        },
      ],
    },

    insight: {
      title: "Key Insight",
      paragraphs: [
        "Wholesale prices showed the strongest contribution among the evaluated exogenous variables, while chili prices and rainfall had more limited influence on forecasting performance.",
      ],
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "Data Preparation",
          description:
            "Prepared and processed daily price and exogenous-variable data for forecasting analysis.",
        },
        {
          title: "Time Series Modeling",
          description:
            "Developed and evaluated ARIMAX models with relevant exogenous variables across multiple train-test scenarios.",
        },
        {
          title: "Machine Learning",
          description:
            "Developed SVR models using lag-based features and hyperparameter tuning with time-series cross-validation.",
        },
        {
          title: "Model Evaluation",
          description:
            "Compared ARIMAX, SVR, and Hybrid ARIMAX-SVR using RMSE, MAE, and MAPE to identify the strongest forecasting approach.",
        },
      ],
    },

    evidence: {
      title: "Thesis documentation",
      description:
        "Selected thesis documentation can be provided for further review.",
      link: "https://drive.google.com/file/d/1I8zUMEqi-jz2TWrmRtGAQHqEVhN5tb7P/view?usp=drive_link",
      linkLabel: "Project Files",
    },
  },
  "maybank-sharia-market-positioning": {
    category: "Business & Market Analysis",
    title: "Maybank Sharia Market Positioning",
    subtitle:
      "Analysis of brand awareness and customer sentiment to evaluate Maybank Sharia's positioning in Indonesia's Islamic banking market.",

    techStack: [
      "Python",
      "Google Trends",
      "SerpAPI",
      "Google Reviews",
      "ABSA",
      "Data Analysis",
    ],

    overview: {
      title: "Understanding Maybank Sharia's market positioning",
      paragraphs: [
        "This project evaluated Maybank Sharia's market positioning and brand awareness compared with other Islamic banking brands in Indonesia.",
        "The analysis combined Google search trends with customer reviews to understand public attention and identify service-related issues affecting customer perception.",
      ],
      stats: [
        {
          value: "5",
          label: "Islamic banking brands compared",
        },
        {
          value: "2",
          label: "Primary analysis sources",
        },
      ],
    },

    problem: {
      title: "Identifying gaps in brand awareness and customer experience",
      paragraphs: [
        "Maybank Sharia operates in a competitive Islamic banking market where brand visibility and customer experience can influence public perception.",
        "The project therefore examined search interest and customer reviews to identify Maybank Sharia's relative position and areas requiring improvement.",
      ],
    },

    data: {
      title: "Search trends and customer reviews",
      paragraphs: [
        "Google Trends data was used to compare search interest for Maybank Sharia with competing Islamic banking brands.",
        "Customer reviews were collected from Google Reviews and analyzed to identify recurring service-related issues across different aspects of the customer experience.",
      ],
    },

    approach: {
      title: "From public attention to customer experience insights",
      steps: [
        {
          number: "01",
          title: "Data Collection",
          description:
            "Collected Google Trends and Google Reviews data using SerpAPI for comparative market and customer analysis.",
        },
        {
          number: "02",
          title: "Data Preparation",
          description:
            "Preprocessed collected data through normalization, deduplication, and tabular data preparation.",
        },
        {
          number: "03",
          title: "Brand Awareness Analysis",
          description:
            "Compared Google search interest across Maybank Sharia and competing Islamic banking brands to evaluate relative brand visibility.",
        },
        {
          number: "04",
          title: "Sentiment Analysis",
          description:
            "Analyzed customer reviews using aspect-based sentiment analysis across service, queue, product, facility, and digital service aspects.",
        },
      ],
    },

    results: {
      title: "Maybank Sharia showed a clear brand awareness gap",
      description:
        "The analysis indicated that Maybank Sharia had lower and more fluctuating search interest than several competing Islamic banking brands, while customer reviews highlighted service and queue-related issues.",
      metrics: [
        {
          value: "5",
          label: "Islamic banking brands analyzed",
        },
        {
          value: "10",
          label: "Branches included in review analysis",
        },
        {
          value: "5",
          label: "Customer experience aspects",
        },
        {
          value: "Jan 2024–Apr 2025",
          label: "Analysis period",
        },
      ],
    },

    visualizations: {
      title: "Key Visualizations",
      items: [
        {
          title: "Google Search Trend & Brand Awareness",
          description:
            "Comparison of Google search interest for Maybank Sharia, BSI, Muamalat, CIMB Syariah, and BTN Syariah. Maybank Sharia shows lower and more fluctuating search interest, while competing brands show higher search volumes and several notable spikes.",
          image:
            "/projects/maybank/google-trends-brand-awareness.png",
        },
        {
          title: "Sentiment Distribution by Service Aspect",
          description:
            "Distribution of negative, neutral, and positive customer sentiment across service, queue, product, facility, and digital service aspects based on Google Reviews.",
          image: "/projects/maybank/sentiment-by-aspect.png",
        },
      ],
    },

    insight: {
      title: "Brand awareness and service experience remain key opportunities",
      paragraphs: [
        "BSI, Muamalat, and BTN Syariah consistently showed higher search volumes than Maybank Sharia. Maybank Sharia's search interest was comparatively lower and more fluctuating, with fewer notable spikes throughout the observed period.",
        "Customer sentiment showed that negative perceptions were most prominent in face-to-face service and queue management. Additional concerns appeared in product access, branch facilities, and digital services.",
        "These findings suggest opportunities to strengthen brand communication and campaigns while improving queue management, simplifying product access, and enhancing digital services to create a more consistent customer experience.",
      ],
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "Google Reviews Scraping",
          description:
            "Collected and prepared customer reviews from Google Reviews for the customer experience analysis.",
        },
        {
          title: "Google Trends Analysis",
          description:
            "Collected Google Trends data and analyzed search interest to evaluate Maybank Sharia's relative brand awareness.",
        },
        {
          title: "Brand Awareness Analysis",
          description:
            "Compared Maybank Sharia's search trends with competing Islamic banking brands and interpreted the observed patterns and spikes.",
        },
        {
          title: "Sentiment Analysis",
          description:
            "Analyzed customer sentiment across service-related aspects and interpreted recurring negative perceptions in the reviews.",
        },
      ],
    },

    evidence: {
      title: "Project documentation",
      description:
        "Selected project documentation and supporting materials can be provided for further review.",
      link: "https://drive.google.com/file/d/1pHKolnzVDPhvoHk4pyob6miHvyxKgyuk/view?usp=drive_link",
      linkLabel: "Project Files",
    },
  },
  "bisindo-sign-language-recognition": {
    category: "Computer Vision / Machine Learning",
    title: "BISINDO Sign Language Recognition",
    subtitle:
      "Real-time Indonesian sign language recognition using MediaPipe and YOLO for alphabet gesture classification.",

    techStack: [
      "Python",
      "MediaPipe",
      "YOLO",
      "Computer Vision",
      "Machine Learning",
    ],

    overview: {
      title: "Recognizing BISINDO alphabet gestures in real time",
      paragraphs: [
        "This project developed a real-time web platform for recognizing Indonesian Sign Language (BISINDO) alphabet gestures from A to Z using a webcam.",
        "The system combined hand landmark feature extraction using MediaPipe with a YOLO-based recognition pipeline to classify one-hand and two-hand alphabet gestures and convert them into text.",
      ],
      stats: [
        {
          value: "26",
          label: "Alphabet classes",
        },
        {
          value: "8,460",
          label: "Total samples",
        },
        {
          value: "99.00%",
          label: "One-hand accuracy",
        },
        {
          value: "98.96%",
          label: "Two-hand accuracy",
        },
      ],
    },

    problem: {
      title: "Recognizing sign language gestures from visual input",
      paragraphs: [
        "Sign language communication relies on hand gestures that can vary in position, orientation, and movement, making automatic recognition a computer vision challenge.",
        "The project therefore focused on developing a recognition system that could process hand gestures from a webcam and classify BISINDO alphabet signs into readable text in real time.",
      ],
    },

    data: {
      title: "BISINDO alphabet gesture dataset",
      paragraphs: [
        "The dataset covered 26 BISINDO alphabet classes from A to Z, consisting of both one-hand and two-hand gestures.",
        "A total of 8,460 samples were processed, including 2,480 one-hand samples and 5,980 two-hand samples.",
      ],
    },

    approach: {
      title: "From hand images to real-time text recognition",
      steps: [
        {
          number: "01",
          title: "Data Preparation",
          description:
            "Prepared BISINDO alphabet gesture samples covering 26 classes with one-hand and two-hand variations.",
        },
        {
          number: "02",
          title: "Feature Extraction",
          description:
            "Extracted hand landmark information using MediaPipe Hands to represent gesture characteristics as numerical features.",
        },
        {
          number: "03",
          title: "Modeling",
          description:
            "Integrated YOLO into the recognition pipeline to classify BISINDO alphabet gestures.",
        },
        {
          number: "04",
          title: "Web Integration",
          description:
            "Integrated the recognition pipeline into a web interface for real-time webcam-based gesture prediction.",
        },
      ],
    },

    model: {
      title: "MediaPipe + YOLO Recognition Pipeline",
      description:
        "The recognition workflow uses MediaPipe Hands to extract hand landmark features before integrating them into a YOLO-based recognition system for one-hand and two-hand alphabet gestures.",
      parameters: [
        {
          label: "Target",
          value: "BISINDO A–Z",
        },
        {
          label: "Feature Extraction",
          value: "MediaPipe Hands",
        },
        {
          label: "One-Hand Features",
          value: "42",
        },
        {
          label: "Two-Hand Features",
          value: "84",
        },
      ],
    },

    visualizations: {
      title: "Key Visualizations",
      items: [
        {
          title: "MediaPipe Landmark Extraction",
          description:
            "Hand landmark visualization showing the extracted keypoints used to represent BISINDO alphabet gestures across different classes.",
          image: "/projects/bisindo/mediapipe-landmarks.png",
        },
        {
          title: "Real-Time Web Interface",
          description:
            "Web interface developed for real-time BISINDO alphabet recognition using webcam input and automatic gesture-to-text conversion.",
          image: "/projects/bisindo/web-interface.png",
        },
      ],
    },

    results: {
      title: "High recognition accuracy across one-hand and two-hand gestures",
      description:
        "The evaluation showed strong recognition performance for both one-hand and two-hand BISINDO alphabet gesture models.",
      metrics: [
        {
          value: "99.00%",
          label: "One-hand accuracy",
        },
        {
          value: "98.96%",
          label: "Two-hand accuracy",
        },
        {
          value: "0.0031",
          label: "One-hand loss",
        },
        {
          value: "0.0486",
          label: "Two-hand loss",
        },
      ],
    },

    evaluation: {
      title: "Model Evaluation",
      description:
        "Precision, recall, and F1-score were evaluated separately for one-hand and two-hand BISINDO alphabet gestures.",

      oneHand: {
        title: "One-Hand Model",
        columns: ["Alphabet", "Precision", "Recall", "F1-Score"],
        rows: [
          {
            alphabet: "C",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "E",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "I",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "J",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "L",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "O",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "R",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "U",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "V",
            precision: "0.92",
            recall: "1.00",
            f1: "0.96",
          },
          {
            alphabet: "Z",
            precision: "1.00",
            recall: "0.92",
            f1: "0.96",
          },
        ],
      },

      twoHand: {
        title: "Two-Hand Model",
        columns: ["Alphabet", "Precision", "Recall", "F1-Score"],
        rows: [
          {
            alphabet: "A",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "B",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "D",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "F",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "G",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "H",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "K",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "M",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "N",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "P",
            precision: "0.92",
            recall: "1.00",
            f1: "0.96",
          },
          {
            alphabet: "Q",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "S",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "T",
            precision: "1.00",
            recall: "0.92",
            f1: "0.96",
          },
          {
            alphabet: "X",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
          {
            alphabet: "Z",
            precision: "1.00",
            recall: "1.00",
            f1: "1.00",
          },
        ],
      },
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "MediaPipe Feature Extraction",
          description:
            "Implemented hand landmark feature extraction using MediaPipe to transform gesture images into structured numerical features.",
        },
        {
          title: "YOLO Integration",
          description:
            "Contributed to integrating YOLO into the gesture recognition pipeline for BISINDO alphabet classification.",
        },
        {
          title: "Backend Integration",
          description:
            "Contributed to the backend integration connecting the recognition process with the web application.",
        },
        {
          title: "Web Interface",
          description:
            "Contributed to the user interface for real-time webcam-based BISINDO gesture recognition.",
        },
      ],
    },

    evidence: {
      title: "Project documentation",
      description:
        "Selected project documentation and implementation materials can be provided for further review.",
      link: "https://github.com/richowignyo/signdetection_MLProject",
      linkLabel: "Project Files",
    },
  },
  "lgbt-discourse-sentiment-analysis": {
    category: "NLP / Sentiment Analysis",
    title: "LGBT Discourse Sentiment Analysis",
    subtitle:
      "Analysis of Indonesian-language Twitter discourse during the COVID-19 pandemic using sentiment classification and Social Network Analysis.",

    techStack: [
      "Python",
      "Random Forest",
      "NLP",
      "Gephi",
      "Social Network Analysis",
    ],

    visualizations: {
      title: "Key Visualizations",
      items: [
        {
          title: "Sentiment Label Distribution",
          description:
            "The sentiment distribution shows the number of Indonesian-language tweets classified into negative, neutral, and positive sentiment categories.",
          image: "/projects/lgbt-sentiment/label-distribution.png",
        },
        {
          title: "Classification Confusion Matrix",
          description:
            "The confusion matrix compares the actual and predicted sentiment labels to evaluate the classification performance across negative, neutral, and positive classes.",
          image: "/projects/lgbt-sentiment/confusion-matrix.png",
        },
        {
          title: "Social Network Analysis",
          description:
            "The network visualization illustrates relationships between Twitter accounts within the analyzed discussion and provides an overview of the interaction structure.",
          image: "/projects/lgbt-sentiment/social-network-analysis.png",
        },
        {
          title: "Word Cloud",
          description:
            "The word cloud highlights frequently occurring terms in the analyzed Twitter discourse and provides an overview of the dominant words discussed.",
          image: "/projects/lgbt-sentiment/wordcloud.png",
        },
      ],
    },

    overview: {
      title: "Analyzing Indonesian LGBT discourse on Twitter",
      paragraphs: [
        "This project analyzed public discourse related to LGBT topics on Twitter during the COVID-19 pandemic, with a specific focus on Indonesian-language discussions.",
        "The analysis examined sentiment patterns, frequently discussed terms, and relationships between accounts within the Indonesian Twitter network.",
      ],
      stats: [
        {
          value: "600",
          label: "Indonesian-language tweets",
        },
        {
          value: "1,800",
          label: "Total multilingual tweets",
        },
        {
          value: "41%",
          label: "Classification accuracy",
        },
      ],
    },

    problem: {
      title: "Understanding sentiment and discussion patterns in online discourse",
      paragraphs: [
        "Twitter discussions around LGBT topics contain different opinions and interactions that can be examined through sentiment analysis and network analysis.",
        "The project aimed to identify sentiment patterns within Indonesian-language tweets while also exploring the terms and account relationships that characterized the discussion.",
      ],
    },

    data: {
      title: "Multilingual Twitter discourse during COVID-19",
      paragraphs: [
        "The dataset consisted of 1,800 multilingual tweets collected during the COVID-19 pandemic, including 600 Indonesian-language tweets.",
        "The Indonesian dataset was analyzed separately to examine sentiment classification, frequently occurring terms, and social network relationships within the local-language discussion.",
      ],
    },

    approach: {
      title: "From tweets to sentiment and network insights",
      steps: [
        {
          number: "01",
          title: "Data Collection",
          description:
            "Collected multilingual Twitter data using TweetHarvest with Python, including 600 Indonesian-language tweets.",
        },
        {
          number: "02",
          title: "Sentiment Classification",
          description:
            "Applied Random Forest classification to categorize Indonesian-language tweets into negative, neutral, and positive sentiment.",
        },
        {
          number: "03",
          title: "Text Analysis",
          description:
            "Examined frequently occurring terms and visualized discussion patterns through word clouds.",
        },
        {
          number: "04",
          title: "Social Network Analysis",
          description:
            "Analyzed relationships between accounts and discussion structures using Social Network Analysis with Gephi.",
        },
      ],
    },

    model: {
      title: "Random Forest Sentiment Classification",
      description:
        "Random Forest was used to classify Indonesian-language tweets into negative, neutral, and positive sentiment categories. The results were complemented by word cloud analysis and Social Network Analysis using Gephi.",
      parameters: [
        {
          label: "Dataset",
          value: "600 Indonesian Tweets",
        },
        {
          label: "Sentiment Classes",
          value: "Negative / Neutral / Positive",
        },
        {
          label: "Classifier",
          value: "Random Forest",
        },
        {
          label: "Network Analysis",
          value: "Gephi",
        },
      ],
    },

    results: {
      title: "Sentiment classification revealed clear limitations",
      description:
        "The Indonesian-language sentiment model achieved 41% accuracy. Negative sentiment had the strongest F1-score among the three classes, while the analysis also revealed differences in network structure and discussion patterns.",
      metrics: [
        {
          value: "41%",
          label: "Accuracy",
        },
        {
          value: "0.57",
          label: "Negative F1-score",
        },
        {
          value: "0.36",
          label: "Neutral F1-score",
        },
      ],
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "Indonesian Dataset Analysis",
          description:
            "Focused on analyzing the Indonesian-language portion of the Twitter dataset consisting of 600 tweets.",
        },
        {
          title: "Sentiment Analysis",
          description:
            "Evaluated and interpreted the Random Forest sentiment classification results for negative, neutral, and positive categories.",
        },
        {
          title: "Text Analysis",
          description:
            "Analyzed frequently occurring terms and generated word cloud visualizations to identify prominent discussion topics.",
        },
        {
          title: "Social Network Analysis",
          description:
            "Analyzed the Indonesian Twitter network using Gephi to examine account relationships and discussion structures.",
        },
      ],
    },

    evidence: {
      title: "Project documentation",
      description:
        "Selected project documentation can be provided for further review.",
      link: "https://drive.google.com/file/d/12ekteIaIPXTbFBFlQ-S4eFR2cw5_vly4/view?usp=drive_link",
      linkLabel: "Project Files",
    },
  },
  "medical-qa-chatbot-rag": {
    category: "Natural Language Processing / AI",
    title: "Medical QA Chatbot Using RAG",
    subtitle:
      "A medical question-answering chatbot using Retrieval-Augmented Generation to provide context-aware responses to health-related questions.",

    techStack: [
      "RAG",
      "BM25",
      "FAISS",
      "Dense Retrieval",
      "NLP",
    ],

    overview: {
      title: "Building a context-aware medical QA chatbot",
      paragraphs: [
        "This project developed a medical question-answering chatbot using Retrieval-Augmented Generation (RAG) to improve the relevance of generated responses.",
        "The system combined information retrieval with generative language models so that responses could be generated based on retrieved contextual information.",
      ],
      stats: [
        {
          value: "4",
          label: "Retrieval approaches",
        },
        {
          value: "3",
          label: "Generative models",
        },
        {
          value: "0.3343",
          label: "Best ROUGE-1",
        },
      ],
    },

    problem: {
      title: "Generating answers with relevant medical context",
      paragraphs: [
        "A question-answering system needs to retrieve relevant information before generating an answer, especially when responses depend on specific knowledge contained in a reference dataset.",
        "The project explored different retrieval approaches and generative models to build a pipeline capable of retrieving relevant context and producing answers to medical questions.",
      ],
    },

    data: {
      title: "Medical question-answering knowledge",
      paragraphs: [
        "The system used a knowledge base containing information relevant to medical question answering as the retrieval source.",
        "Retrieved documents were used as contextual information for the generation stage, allowing the chatbot to produce responses based on information selected by the retrieval component.",
      ],
    },

    approach: {
      title: "From retrieval to generated answers",
      steps: [
        {
          number: "01",
          title: "Knowledge Retrieval",
          description:
            "Retrieved relevant information from the knowledge base using multiple retrieval approaches.",
        },
        {
          number: "02",
          title: "Retrieval Comparison",
          description:
            "Evaluated BM25, Dense Retrieval, FAISS, and a hybrid BM25+FAISS retrieval approach.",
        },
        {
          number: "03",
          title: "Response Generation",
          description:
            "Integrated retrieved context with generative language models including GPT-2, GPT-3.5, and BART.",
        },
        {
          number: "04",
          title: "Evaluation",
          description:
            "Compared generated responses using ROUGE-based evaluation metrics.",
        },
      ],
    },

    model: {
      title: "Retrieval-Augmented Generation",
      description:
        "The system combined retrieval methods with generative language models. BM25 provided keyword-based retrieval, while Dense Retrieval and FAISS supported semantic similarity search. A hybrid BM25+FAISS approach combined keyword and semantic retrieval.",
      parameters: [
        {
          label: "Keyword Retrieval",
          value: "BM25",
        },
        {
          label: "Vector Search",
          value: "FAISS",
        },
        {
          label: "Dense Retrieval",
          value: "Dense Retrieval",
        },
        {
          label: "Generative Models",
          value: "GPT-2 / GPT-3.5 / BART",
        },
      ],
    },

    results: {
      title: "BART achieved the highest ROUGE-1 score",
      description:
        "Among the evaluated generative models, BART achieved the highest ROUGE-1 score, indicating stronger overlap with the reference answers under the evaluated setup.",
      metrics: [
        {
          value: "0.2526",
          label: "GPT-2 ROUGE-1",
        },
        {
          value: "0.3068",
          label: "GPT-3.5 ROUGE-1",
        },
        {
          value: "0.3343",
          label: "BART ROUGE-1",
        },
      ],
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "System Implementation",
          description:
            "Contributed to coding and system implementation of the medical QA chatbot together with a teammate.",
        },
        {
          title: "RAG Pipeline Integration",
          description:
            "Collaborated on integrating retrieval and response-generation components into the chatbot workflow.",
        },
        {
          title: "System Development",
          description:
            "Supported the development and integration of the retrieval and generation workflow.",
        },
        {
          title: "Testing & Evaluation",
          description:
            "Supported testing and evaluation of the chatbot pipeline and generated responses.",
        },
      ],
    },

    evidence: {
      title: "Project documentation",
      description:
        "Selected project documentation can be provided for further review.",
      link: "https://drive.google.com/file/d/1G_Z8_Z_kfm4ehharjrHNhnGx1-4vi1cx/view?usp=drive_link",
      linkLabel: "Project Files",
    },
  },
  "queue-system-analysis-kopi-kenangan": {
    category: "Operational / Data Analysis",
    title: "Queue System Analysis at Kopi Kenangan",
    subtitle:
      "Operational analysis of customer arrival and service patterns during weekday and weekend peak periods.",

    techStack: [
      "Statistical Analysis",
      "Queueing Theory",
      "Data Analysis",
    ],

    overview: {
      title: "Analyzing customer queues and service efficiency",
      paragraphs: [
        "This project analyzed customer arrival and service patterns at Kopi Kenangan Mulyosari to understand queue characteristics during weekday and weekend peak periods.",
        "The analysis applied queueing theory to evaluate customer waiting times, service times, system utilization, and overall queue performance.",
      ],
      stats: [
        {
          value: "39.1%",
          label: "Weekend utilization",
        },
        {
          value: "23.8%",
          label: "Weekday utilization",
        },
        {
          value: "3.26 min",
          label: "Weekend average system time",
        },
      ],
    },

    problem: {
      title: "Understanding queue performance during peak periods",
      paragraphs: [
        "Customer arrival and service patterns can vary between weekdays and weekends, potentially affecting waiting times and system utilization.",
        "The project therefore examined the queue characteristics during peak periods to determine how efficiently the service system handled customer demand.",
      ],
    },

    data: {
      title: "Customer arrival and service observations",
      paragraphs: [
        "The study used field observations of customer arrival and service patterns during weekday and weekend peak periods at Kopi Kenangan Mulyosari.",
        "The observed data was used to estimate arrival rates, service rates, waiting times, time spent in the system, and system utilization.",
      ],
    },

    approach: {
      title: "From customer observations to queue performance",
      steps: [
        {
          number: "01",
          title: "Field Observation",
          description:
            "Collected observations of customer arrivals and service activities during weekday and weekend peak periods.",
        },
        {
          number: "02",
          title: "Distribution Testing",
          description:
            "Applied exponential distribution testing to evaluate the characteristics of customer arrival and service processes.",
        },
        {
          number: "03",
          title: "Queueing Analysis",
          description:
            "Applied a single-channel, single-phase queueing model to estimate arrival rate, service rate, waiting time, and system utilization.",
        },
        {
          number: "04",
          title: "Weekday vs Weekend",
          description:
            "Compared queue performance between weekday and weekend peak periods to identify differences in operational efficiency.",
        },
      ],
    },

    model: {
      title: "Single-Channel, Single-Phase Queue Model",
      description:
        "The queueing system was analyzed using a single-channel, single-phase model to evaluate customer flow and service performance under weekday and weekend peak conditions.",
      parameters: [
        {
          label: "Queue Type",
          value: "Single Channel",
        },
        {
          label: "Service Phase",
          value: "Single Phase",
        },
        {
          label: "Distribution",
          value: "Exponential",
        },
        {
          label: "Analysis",
          value: "Queueing Theory",
        },
      ],
    },

    results: {
      title: "Weekend periods showed higher system utilization",
      description:
        "The weekend period had higher system utilization and longer average time in the system compared with weekdays, indicating greater customer demand during weekend peak periods.",
      metrics: [
        {
          value: "39.1%",
          label: "Weekend utilization",
        },
        {
          value: "23.8%",
          label: "Weekday utilization",
        },
        {
          value: "3.26 min",
          label: "Weekend average system time",
        },
      ],
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "Data Collection",
          description:
            "Collected and organized observations of customer arrivals and service patterns during weekday and weekend peak periods.",
        },
        {
          title: "Statistical Analysis",
          description:
            "Performed distribution testing and calculated queueing parameters from the observed customer flow data.",
        },
        {
          title: "Queueing Analysis",
          description:
            "Applied queueing theory to evaluate arrival rate, service rate, waiting time, system time, and utilization.",
        },
        {
          title: "Operational Interpretation",
          description:
            "Compared weekday and weekend queue performance and interpreted the results for service efficiency.",
        },
      ],
    },

    evidence: {
      title: "Project documentation",
      description:
        "Selected project documentation can be provided for further review.",
      link: "https://drive.google.com/file/d/11wmIobKwbw8PTTj_FG8RQRt6pWn5ZmQH/view?usp=drive_link",
      linkLabel: "Project Files",
    },
  },
  "evachub-disaster-information-system": {
    category: "Database Management / BI",
    title: "EvacHub — Disaster Information System",
    subtitle:
      "A data-driven disaster information and evacuation management system integrating database, backend, and dashboard components.",

    techStack: [
      "SQL",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
    ],

    visualizations: {
      title: "Key Visualizations",
      items: [
        {
          title: "Disaster Data Warehouse Schema",
          description:
            "Star schema designed to organize disaster and evacuation-related data, connecting disaster and evacuee dimensions with time dimensions through the disaster fact table.",
          image: "/projects/evachub/disaster-star-schema.png",
        },
        {
          title: "Logistics Data Warehouse Schema",
          description:
            "Star schema designed to organize logistics data, linking disaster, stock, distribution, and time dimensions through the logistics fact table.",
          image: "/projects/evachub/logistics-star-schema.png",
        },
        {
          title: "EvacHub Dashboard",
          description:
            "Web-based dashboard presenting disaster information, active and completed disaster records, and monthly disaster trends to support monitoring and information management.",
          image: "/projects/evachub/evachub-dashboard.png",
        },
      ],
    },

    overview: {
      title: "Connecting disaster data for better monitoring",
      paragraphs: [
        "EvacHub is a data-driven disaster information and evacuation management system designed to integrate disaster, evacuation, camp, and logistics information into a centralized platform.",
        "The system connects the database, backend, and frontend to provide information that can support monitoring of disaster conditions, evacuees, evacuation camps, and logistics.",
      ],
      stats: [
        {
          value: "SQL",
          label: "Data layer",
        },
        {
          value: "MySQL",
          label: "Database",
        },
        {
          value: "Chart.js",
          label: "Dashboard visualization",
        },
      ],
    },

    problem: {
      title: "Turning distributed disaster data into actionable information",
      paragraphs: [
        "Disaster management involves multiple types of information, including disaster conditions, evacuation data, camp availability, and logistics inventory.",
        "EvacHub was developed to connect these data components into a centralized system so that relevant information could be retrieved and presented through an interactive dashboard.",
      ],
    },

    data: {
      title: "Integrated disaster and evacuation data",
      paragraphs: [
        "The system integrates data related to disasters, evacuations, evacuation camps, evacuees, and logistics.",
        "The data is stored in a MySQL-based data environment and accessed through SQL queries before being delivered to the application and dashboard layer.",
      ],
    },

    approach: {
      title: "From database queries to an interactive dashboard",
      steps: [
        {
          number: "01",
          title: "Database",
          description:
            "Worked with structured disaster, evacuation, camp, and logistics data stored in a MySQL environment.",
        },
        {
          number: "02",
          title: "SQL Layer",
          description:
            "Developed analytical SQL queries to retrieve and process information required by the application.",
        },
        {
          number: "03",
          title: "Backend Integration",
          description:
            "Connected the SQL data layer with the backend so that processed information could be delivered to the frontend.",
        },
        {
          number: "04",
          title: "Dashboard",
          description:
            "Integrated the backend data into a web-based dashboard using HTML, CSS, JavaScript, and Chart.js.",
        },
      ],
    },

    model: {
      title: "Database-Driven Dashboard Architecture",
      description:
        "The system uses a database-driven architecture where structured disaster and evacuation data is queried through SQL, connected to the backend, and presented through a web-based dashboard.",
      parameters: [
        {
          label: "Database",
          value: "MySQL",
        },
        {
          label: "Query Language",
          value: "SQL",
        },
        {
          label: "Frontend",
          value: "HTML / CSS / JavaScript",
        },
        {
          label: "Visualization",
          value: "Chart.js",
        },
      ],
    },

    results: {
      title: "Centralized monitoring through a data-driven dashboard",
      description:
        "The resulting system provides a centralized interface for monitoring disaster status, evacuee information, evacuation camps, and logistics data through database-connected visualizations.",
      metrics: [
        {
          value: "SQL",
          label: "Data processing",
        },
        {
          value: "MySQL",
          label: "Data storage",
        },
        {
          value: "Chart.js",
          label: "Data visualization",
        },
      ],
    },

    contribution: {
      title: "What I worked on",
      items: [
        {
          title: "SQL & Data Layer",
          description:
            "Developed analytical SQL queries to retrieve and process data required by the application and dashboard.",
        },
        {
          title: "Backend Integration",
          description:
            "Connected the SQL data layer with the backend so that database information could be delivered to the frontend.",
        },
        {
          title: "Frontend Development",
          description:
            "Contributed to the web interface using HTML, CSS, and JavaScript.",
        },
        {
          title: "Dashboard Integration",
          description:
            "Integrated backend data into dashboard visualizations using Chart.js.",
        },
      ],
    },

    evidence: {
      title: "Project documentation",
      description:
        "Selected project documentation can be provided for further review.",
      link: "https://github.com/richowignyo/EvacHub",
      linkLabel: "Project Files",
    },
  },
};