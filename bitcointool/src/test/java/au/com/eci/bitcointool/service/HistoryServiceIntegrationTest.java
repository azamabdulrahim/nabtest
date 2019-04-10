package au.com.eci.bitcointool.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import au.com.eci.bitcointool.domain.DailyBestProfit;

import au.com.eci.bitcointool.services.HistoryService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HistoryServiceIntegrationTest {
	@Autowired
	private HistoryService historyService;
	
	@Test
	public void testGetByDate() {
		String date = "20180507";
		
		List<DailyBestProfit> result = historyService.getBestProfit("", date);
		assert(result.size() > 1);		
		for (int i=0; i<result.size(); i++) {
			DailyBestProfit data = result.get(i);
			assert(data.getDate().equals("07/05/2018"));
			Double buy = Double.parseDouble(data.getBuy().getPrice());
			Double sell = Double.parseDouble(data.getSell().getPrice());
			String profit = String.format("%.2f", sell-buy);
			assert(profit.equals(data.getProfit()));
		}
	}

	@Test
	public void testGetByDateAndCurrency() {
		String date = "20180507";
		
		List<DailyBestProfit> result = historyService.getBestProfit("BTC", date);
		assert(result.size() == 1);		
		DailyBestProfit data = result.get(0);
		assert(data.getCurrency().equals("BTC"));
		assert(data.getDate().equals("07/05/2018"));
		Double buy = Double.parseDouble(data.getBuy().getPrice());
		Double sell = Double.parseDouble(data.getSell().getPrice());
		String profit = String.format("%.2f", sell-buy);
		assert(profit.equals(data.getProfit()));
		
		result = historyService.getBestProfit("ETC", date);
		assert(result.size() == 1);		
		data = result.get(0);
		assert(data.getCurrency().equals("ETC"));
		assert(data.getDate().equals("07/05/2018"));
		buy = Double.parseDouble(data.getBuy().getPrice());
		sell = Double.parseDouble(data.getSell().getPrice());
		profit = String.format("%.2f", sell-buy);
		assert(profit.equals(data.getProfit()));
		
		result = historyService.getBestProfit("LTC", date);
		assert(result.size() == 1);		
		data = result.get(0);
		assert(data.getCurrency().equals("LTC"));
		assert(data.getDate().equals("07/05/2018"));
		buy = Double.parseDouble(data.getBuy().getPrice());
		sell = Double.parseDouble(data.getSell().getPrice());
		profit = String.format("%.2f", sell-buy);
		assert(profit.equals(data.getProfit()));
	}

	@Test
	public void testGetByDateNoData() {
		String date = "20180501";
		List<DailyBestProfit> result = historyService.getBestProfit("", date);
		assert(result.size() == 0);				
	}

	@Test
	public void testGetByDateAndCurrencyNoData() {
		String date = "20180501";
		
		List<DailyBestProfit> result = historyService.getBestProfit("BTC", date);
		assert(result.size() == 0);		
		
		result = historyService.getBestProfit("ETC", date);
		assert(result.size() == 0);		
		
		result = historyService.getBestProfit("LTC", date);
		assert(result.size() == 0);		
	}
}
