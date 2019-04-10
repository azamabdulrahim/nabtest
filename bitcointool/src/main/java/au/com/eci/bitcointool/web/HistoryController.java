package au.com.eci.bitcointool.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import au.com.eci.bitcointool.domain.DailyBestProfit;
import au.com.eci.bitcointool.domain.History;
import au.com.eci.bitcointool.services.HistoryService;

@RestController
@RequestMapping("/api/history")
public class HistoryController {
	@Autowired
	private HistoryService historyService;
	
	@GetMapping("/all")
	public List<History> findAll() {
		return historyService.findAll();
	}

	@GetMapping("/{date}")
	public List<History> findByDate(@PathVariable String date) {
		return historyService.findByCurrencyAndDate("", date);
	}	

	@GetMapping("/{date}/{currency}")
	public List<History> findByCurrencyAndDate(@PathVariable String date, @PathVariable String currency) {
		return historyService.findByCurrencyAndDate(currency, date);
	}	

	@GetMapping("/getBestProfit/{date}")
	public List<DailyBestProfit> getBestProfit(@PathVariable String date) {
		return historyService.getBestProfit("", date);
	}	

	@GetMapping("/getBestProfit/{date}/{currency}")
	public List<DailyBestProfit> getBestProfit(@PathVariable String date, @PathVariable String currency) {
		return historyService.getBestProfit(currency, date);
	}	
}
