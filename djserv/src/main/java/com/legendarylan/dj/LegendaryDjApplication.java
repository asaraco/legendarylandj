package com.legendarylan.dj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

//@EntityScan("com.legendarylan.mixxx.data")
@EnableAutoConfiguration
@SpringBootApplication
public class LegendaryDjApplication {

	public static void main(String[] args) {
		System.out.println("DEBUG! Before SpringApplication.run()");
		SpringApplication.run(LegendaryDjApplication.class, args);
		System.out.println("DEBUG! After SpringApplication.run()");
	}

}
