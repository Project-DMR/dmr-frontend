export type Language = 'en' | 'hi' | 'mr';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      reports: 'Reports',
      upload: 'Upload',
    },
    // Home page
    home: {
      title: 'Sugarcane Manufacturing Dashboard',
      subtitle: 'Daily Production Monitoring System',
      description: 'A comprehensive daily production monitoring dashboard for sugar factories, enabling quick insights into manufacturing performance, sugar recovery, losses, production trends, and factory efficiency.',
      cta: 'Go to Dashboard',
      features: {
        realtime: 'Real-time Monitoring',
        realtimeDesc: 'Track crushing data, recovery rates, and production metrics as they happen.',
        analytics: 'Advanced Analytics',
        analyticsDesc: 'Visualize trends, compare performance, and identify optimization opportunities.',
        reports: 'Comprehensive Reports',
        reportsDesc: 'Generate detailed reports with filtering, search, and export capabilities.',
      },
    },
    // Dashboard
    dashboard: {
      title: 'Production Dashboard',
      subtitle: 'Real-time manufacturing metrics and analytics',
      kpi: {
        caneCrushed: 'Cane Crushed Today',
        sugarProduced: 'Sugar Produced',
        recovery: 'Sugar Recovery',
        bagasse: 'Bagasse Production',
        molasses: 'Molasses Output',
        efficiency: 'Efficiency Status',
      },
      charts: {
        dailyTrend: 'Daily Production Trend',
        dailyTrendDesc: 'Cane crushed and sugar produced over the last 7 days',
        recoveryComparison: 'Recovery vs Crushing',
        recoveryComparisonDesc: 'Comparing recovery percentage with crushing volume',
        productionComparison: 'Production Comparison',
        productionComparisonDesc: 'Weekly production metrics breakdown',
        resourceDistribution: 'Resource Distribution',
        resourceDistributionDesc: 'Output distribution across products',
      },
      status: {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
      },
    },
    // Reports
    reports: {
      title: 'Production Reports',
      subtitle: 'View and analyze historical production data',
      searchPlaceholder: 'Search by date or status...',
      table: {
        date: 'Date',
        caneCrushed: 'Cane Crushed (T)',
        sugarProduced: 'Sugar Produced (T)',
        recovery: 'Recovery %',
        bagasse: 'Bagasse (T)',
        molasses: 'Molasses (T)',
        status: 'Status',
      },
      pagination: {
        showing: 'Showing',
        of: 'of',
        results: 'results',
      },
    },
    // Upload
    upload: {
      title: 'Upload Production Data',
      subtitle: 'Upload your daily production reports for processing',
      dropzone: 'Drag & drop your file here, or click to browse',
      formats: 'Supported formats: CSV, XLSX (Max 10MB)',
      selectedFile: 'Selected File',
      uploadBtn: 'Upload to Server',
      uploading: 'Uploading...',
      processing: 'Data will be processed by backend, please wait for dashboard update.',
      success: 'File uploaded successfully!',
      error: 'Upload failed. Please try again.',
      remove: 'Remove',
    },
    // Chatbot
    chatbot: {
      title: 'Factory Assistant',
      placeholder: 'Ask about factory performance...',
      welcome: 'Hello! I\'m your factory assistant. Ask me anything about production metrics, efficiency, or factory performance.',
      responses: {
        recovery: 'Current sugar recovery rate is 10.2%, which is above the industry average of 9.5%. Great performance!',
        production: 'Today\'s production is on track. We\'ve crushed 2,450 tons of cane and produced 245 tons of sugar.',
        efficiency: 'Factory efficiency is currently at HIGH status with 94% operational efficiency.',
        default: 'I\'m still learning! For detailed analytics, please check the Dashboard or Reports section.',
      },
    },
    // Common
    common: {
      tons: 'Tons',
      percentage: '%',
      fromYesterday: 'from yesterday',
      language: 'Language',
    },
  },
  hi: {
    // Navigation
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      reports: 'रिपोर्ट',
      upload: 'अपलोड',
    },
    // Home page
    home: {
      title: 'गन्ना विनिर्माण डैशबोर्ड',
      subtitle: 'दैनिक उत्पादन निगरानी प्रणाली',
      description: 'चीनी कारखानों के लिए एक व्यापक दैनिक उत्पादन निगरानी डैशबोर्ड, जो विनिर्माण प्रदर्शन, चीनी रिकवरी, नुकसान, उत्पादन रुझान और कारखाने की दक्षता में त्वरित अंतर्दृष्टि प्रदान करता है।',
      cta: 'डैशबोर्ड पर जाएं',
      features: {
        realtime: 'रीयल-टाइम निगरानी',
        realtimeDesc: 'क्रशिंग डेटा, रिकवरी दर और उत्पादन मेट्रिक्स को ट्रैक करें।',
        analytics: 'उन्नत विश्लेषण',
        analyticsDesc: 'रुझान देखें, प्रदर्शन की तुलना करें और अनुकूलन अवसर खोजें।',
        reports: 'व्यापक रिपोर्ट',
        reportsDesc: 'फ़िल्टरिंग, खोज और निर्यात क्षमताओं के साथ विस्तृत रिपोर्ट बनाएं।',
      },
    },
    // Dashboard
    dashboard: {
      title: 'उत्पादन डैशबोर्ड',
      subtitle: 'रीयल-टाइम विनिर्माण मेट्रिक्स और विश्लेषण',
      kpi: {
        caneCrushed: 'आज पेराई गन्ना',
        sugarProduced: 'चीनी उत्पादन',
        recovery: 'चीनी रिकवरी',
        bagasse: 'बगैस उत्पादन',
        molasses: 'शीरा उत्पादन',
        efficiency: 'दक्षता स्थिति',
      },
      charts: {
        dailyTrend: 'दैनिक उत्पादन रुझान',
        dailyTrendDesc: 'पिछले 7 दिनों में गन्ना पेराई और चीनी उत्पादन',
        recoveryComparison: 'रिकवरी बनाम पेराई',
        recoveryComparisonDesc: 'पेराई मात्रा के साथ रिकवरी प्रतिशत की तुलना',
        productionComparison: 'उत्पादन तुलना',
        productionComparisonDesc: 'साप्ताहिक उत्पादन मेट्रिक्स विवरण',
        resourceDistribution: 'संसाधन वितरण',
        resourceDistributionDesc: 'उत्पादों में आउटपुट वितरण',
      },
      status: {
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'निम्न',
      },
    },
    // Reports
    reports: {
      title: 'उत्पादन रिपोर्ट',
      subtitle: 'ऐतिहासिक उत्पादन डेटा देखें और विश्लेषण करें',
      searchPlaceholder: 'तिथि या स्थिति से खोजें...',
      table: {
        date: 'तिथि',
        caneCrushed: 'गन्ना पेराई (टन)',
        sugarProduced: 'चीनी उत्पादन (टन)',
        recovery: 'रिकवरी %',
        bagasse: 'बगैस (टन)',
        molasses: 'शीरा (टन)',
        status: 'स्थिति',
      },
      pagination: {
        showing: 'दिखा रहा है',
        of: 'में से',
        results: 'परिणाम',
      },
    },
    // Upload
    upload: {
      title: 'उत्पादन डेटा अपलोड करें',
      subtitle: 'प्रोसेसिंग के लिए अपनी दैनिक उत्पादन रिपोर्ट अपलोड करें',
      dropzone: 'अपनी फ़ाइल यहां ड्रैग और ड्रॉप करें, या ब्राउज़ करने के लिए क्लिक करें',
      formats: 'समर्थित प्रारूप: CSV, XLSX (अधिकतम 10MB)',
      selectedFile: 'चयनित फ़ाइल',
      uploadBtn: 'सर्वर पर अपलोड करें',
      uploading: 'अपलोड हो रहा है...',
      processing: 'डेटा बैकएंड द्वारा प्रोसेस किया जाएगा, कृपया डैशबोर्ड अपडेट की प्रतीक्षा करें।',
      success: 'फ़ाइल सफलतापूर्वक अपलोड हो गई!',
      error: 'अपलोड विफल। कृपया पुनः प्रयास करें।',
      remove: 'हटाएं',
    },
    // Chatbot
    chatbot: {
      title: 'फैक्ट्री सहायक',
      placeholder: 'फैक्ट्री प्रदर्शन के बारे में पूछें...',
      welcome: 'नमस्ते! मैं आपका फैक्ट्री सहायक हूं। उत्पादन मेट्रिक्स, दक्षता या फैक्ट्री प्रदर्शन के बारे में कुछ भी पूछें।',
      responses: {
        recovery: 'वर्तमान चीनी रिकवरी दर 10.2% है, जो 9.5% के उद्योग औसत से ऊपर है। शानदार प्रदर्शन!',
        production: 'आज का उत्पादन सही रास्ते पर है। हमने 2,450 टन गन्ने की पेराई की और 245 टन चीनी का उत्पादन किया।',
        efficiency: 'फैक्ट्री दक्षता वर्तमान में 94% परिचालन दक्षता के साथ उच्च स्थिति में है।',
        default: 'मैं अभी भी सीख रहा हूं! विस्तृत विश्लेषण के लिए, कृपया डैशबोर्ड या रिपोर्ट अनुभाग देखें।',
      },
    },
    // Common
    common: {
      tons: 'टन',
      percentage: '%',
      fromYesterday: 'कल से',
      language: 'भाषा',
    },
  },
  mr: {
    // Navigation
    nav: {
      home: 'मुख्यपृष्ठ',
      dashboard: 'डॅशबोर्ड',
      reports: 'अहवाल',
      upload: 'अपलोड',
    },
    // Home page
    home: {
      title: 'ऊस उत्पादन डॅशबोर्ड',
      subtitle: 'दैनिक उत्पादन निरीक्षण प्रणाली',
      description: 'साखर कारखान्यांसाठी एक व्यापक दैनिक उत्पादन निरीक्षण डॅशबोर्ड, जे उत्पादन कामगिरी, साखर रिकव्हरी, तोटा, उत्पादन ट्रेंड आणि कारखाना कार्यक्षमता यांबद्दल जलद माहिती देते.',
      cta: 'डॅशबोर्डवर जा',
      features: {
        realtime: 'रिअल-टाइम निरीक्षण',
        realtimeDesc: 'गाळप डेटा, रिकव्हरी दर आणि उत्पादन मेट्रिक्स ट्रॅक करा.',
        analytics: 'प्रगत विश्लेषण',
        analyticsDesc: 'ट्रेंड पहा, कामगिरीची तुलना करा आणि ऑप्टिमायझेशन संधी ओळखा.',
        reports: 'सर्वसमावेशक अहवाल',
        reportsDesc: 'फिल्टरिंग, शोध आणि एक्सपोर्ट क्षमतांसह तपशीलवार अहवाल तयार करा.',
      },
    },
    // Dashboard
    dashboard: {
      title: 'उत्पादन डॅशबोर्ड',
      subtitle: 'रिअल-टाइम उत्पादन मेट्रिक्स आणि विश्लेषण',
      kpi: {
        caneCrushed: 'आज गाळप केलेला ऊस',
        sugarProduced: 'साखर उत्पादन',
        recovery: 'साखर रिकव्हरी',
        bagasse: 'बगॅस उत्पादन',
        molasses: 'मोलॅसिस उत्पादन',
        efficiency: 'कार्यक्षमता स्थिती',
      },
      charts: {
        dailyTrend: 'दैनिक उत्पादन ट्रेंड',
        dailyTrendDesc: 'गेल्या 7 दिवसांत ऊस गाळप आणि साखर उत्पादन',
        recoveryComparison: 'रिकव्हरी विरुद्ध गाळप',
        recoveryComparisonDesc: 'गाळप प्रमाणासह रिकव्हरी टक्केवारीची तुलना',
        productionComparison: 'उत्पादन तुलना',
        productionComparisonDesc: 'साप्ताहिक उत्पादन मेट्रिक्स तपशील',
        resourceDistribution: 'संसाधन वितरण',
        resourceDistributionDesc: 'उत्पादनांमध्ये आउटपुट वितरण',
      },
      status: {
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'कमी',
      },
    },
    // Reports
    reports: {
      title: 'उत्पादन अहवाल',
      subtitle: 'ऐतिहासिक उत्पादन डेटा पहा आणि विश्लेषण करा',
      searchPlaceholder: 'तारीख किंवा स्थितीनुसार शोधा...',
      table: {
        date: 'तारीख',
        caneCrushed: 'ऊस गाळप (टन)',
        sugarProduced: 'साखर उत्पादन (टन)',
        recovery: 'रिकव्हरी %',
        bagasse: 'बगॅस (टन)',
        molasses: 'मोलॅसिस (टन)',
        status: 'स्थिती',
      },
      pagination: {
        showing: 'दाखवत आहे',
        of: 'पैकी',
        results: 'परिणाम',
      },
    },
    // Upload
    upload: {
      title: 'उत्पादन डेटा अपलोड करा',
      subtitle: 'प्रोसेसिंगसाठी तुमचे दैनिक उत्पादन अहवाल अपलोड करा',
      dropzone: 'तुमची फाइल येथे ड्रॅग आणि ड्रॉप करा, किंवा ब्राउझ करण्यासाठी क्लिक करा',
      formats: 'समर्थित फॉरमॅट: CSV, XLSX (कमाल 10MB)',
      selectedFile: 'निवडलेली फाइल',
      uploadBtn: 'सर्व्हरवर अपलोड करा',
      uploading: 'अपलोड होत आहे...',
      processing: 'डेटा बॅकएंडद्वारे प्रोसेस केला जाईल, कृपया डॅशबोर्ड अपडेटची वाट पहा.',
      success: 'फाइल यशस्वीरित्या अपलोड झाली!',
      error: 'अपलोड अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
      remove: 'काढा',
    },
    // Chatbot
    chatbot: {
      title: 'कारखाना सहाय्यक',
      placeholder: 'कारखाना कामगिरीबद्दल विचारा...',
      welcome: 'नमस्कार! मी तुमचा कारखाना सहाय्यक आहे. उत्पादन मेट्रिक्स, कार्यक्षमता किंवा कारखाना कामगिरीबद्दल काहीही विचारा.',
      responses: {
        recovery: 'सध्याचा साखर रिकव्हरी दर 10.2% आहे, जो 9.5% च्या उद्योग सरासरीपेक्षा जास्त आहे. उत्कृष्ट कामगिरी!',
        production: 'आजचे उत्पादन योग्य मार्गावर आहे. आम्ही 2,450 टन उसाचे गाळप केले आणि 245 टन साखर उत्पादन केले.',
        efficiency: 'कारखाना कार्यक्षमता सध्या 94% ऑपरेशनल कार्यक्षमतेसह उच्च स्थितीत आहे.',
        default: 'मी अजून शिकत आहे! तपशीलवार विश्लेषणासाठी, कृपया डॅशबोर्ड किंवा अहवाल विभाग पहा.',
      },
    },
    // Common
    common: {
      tons: 'टन',
      percentage: '%',
      fromYesterday: 'कालपासून',
      language: 'भाषा',
    },
  },
} as const;

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
};
