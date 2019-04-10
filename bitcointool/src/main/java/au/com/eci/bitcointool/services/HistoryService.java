package au.com.eci.bitcointool.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import au.com.eci.bitcointool.domain.DailyBestProfit;
import au.com.eci.bitcointool.domain.History;
import au.com.eci.bitcointool.domain.Quote;
import au.com.eci.bitcointool.repositories.HistoryRepository;

@Service
public class HistoryService {
	@Autowired
	private HistoryRepository historyRepository;
	
	public List<History> findAll() {
		return historyRepository.findAll();
	}

	public List<History> findByCurrencyAndDate(String currency, String date) {
		List<History> history = null;
		if (currency.isEmpty()) {
			if (date.isEmpty()) {
				history = historyRepository.findAllOrderByDate();
			} else {
				history = historyRepository.findByDate(date);
			}
		} else {
			history = historyRepository.findByCurrencyAndDate(currency, date);			
		}
		
		return history;
	}

	public List<DailyBestProfit> getBestProfit(String currency, String date) {		
		List<DailyBestProfit> result = new ArrayList<DailyBestProfit>();

		List<History> history = findByCurrencyAndDate(currency, date);
		
		if (history != null) {
			for (int i=0; i<history.size(); i++) {
				History data = history.get(i);
				List<Quote> quotes = data.getQuotes();
				if (quotes.size() > 1) {
					try {
						String minTime = "", maxTime = "";
						Double minPrice = 0.0, maxPrice = 0.0, maxProfit = 0.0;
						
						//ensure quotes are sorted by time
						quotes.sort(Comparator.comparing(Quote::getTime));
						
						for (int x=0; x<quotes.size(); x++) {
							Quote quote = quotes.get(x);
							String timeX = quote.getTime();
							Double priceX = Double.parseDouble(quote.getPrice());
							
							for (int y=x+1; y<quotes.size(); y++) {
								quote = quotes.get(y);
								String timeY = quote.getTime();
								Double priceY = Double.parseDouble(quote.getPrice());
								
								Double profit = priceY - priceX;
								if (profit > maxProfit) {
									maxProfit = profit;
									minTime = timeX;
									minPrice = priceX;
									maxTime = timeY;
									maxPrice = priceY;
								}
							}							
						}
						
						if (maxProfit > 0.0) {
							SimpleDateFormat dbFormat = new SimpleDateFormat("HHmm");
							SimpleDateFormat outFormat = new SimpleDateFormat("hh:mm a");
							minTime = outFormat.format(dbFormat.parse(minTime));
							maxTime = outFormat.format(dbFormat.parse(maxTime));
							
							DailyBestProfit bestProfit = new DailyBestProfit();
							bestProfit.setCurrency(data.getCurrency());
							String tmp = data.getDate();
							tmp = tmp.substring(6) + "/" + tmp.substring(4,6) + "/" + tmp.substring(0,4);
							bestProfit.setDate(tmp);
							bestProfit.setProfit(String.format("%.2f", maxPrice - minPrice));
							bestProfit.setBuy(new Quote(minTime, String.format("%.2f", minPrice)));
							bestProfit.setSell(new Quote(maxTime, String.format("%.2f", maxPrice)));
							
							result.add(bestProfit);
						}
					} catch (Exception ex) {
						//remove from result
					}
				}
			}
		}
		
		
		
		return result;
	}
}
