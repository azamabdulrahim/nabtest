package au.com.eci.bitcointool.domain;

import java.util.List;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="bitcoindata")
public class History {
	@Id
	private String _id;
	private String currency;
	private String date;
	private List<Quote> quotes;
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
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
	public List<Quote> getQuotes() {
		return quotes;
	}
	public void setQuotes(List<Quote> quotes) {
		this.quotes = quotes;
	}
}
