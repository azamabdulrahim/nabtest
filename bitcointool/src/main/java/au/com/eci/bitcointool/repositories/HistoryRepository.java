package au.com.eci.bitcointool.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import au.com.eci.bitcointool.domain.History;

public interface HistoryRepository extends MongoRepository<History, String> {
	@Override
	List<History> findAll();
	List<History> findAllOrderByDate();
	List<History> findByDate(String date);
	List<History> findByCurrencyAndDate(String currency, String date);
}
