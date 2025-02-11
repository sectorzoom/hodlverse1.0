package org.edgar.hodlverse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
class HodlVerseApplication {

	public static void main(String[] args) {
		SpringApplication.run(HodlVerseApplication.class, args);
	}

}
