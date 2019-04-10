package au.com.eci.bitcointool.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class DailyBestProfit {
	private String currency;
	private String date;	
	private Quote buy;
	private Quote sell;
	private String profit;	
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Quote getBuy() {
		return buy;
	}
	public void setBuy(Quote buy) {
		this.buy = buy;
	}
	public Quote getSell() {
		return sell;
	}
	public void setSell(Quote sell) {
		this.sell = sell;
	}
	public String getProfit() {
		return profit;
	}
	public void setProfit(String profit) {
		this.profit = profit;
	}
}
