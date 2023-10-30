package com.legendarylan.dj;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class Configs {
	private static Logger logger = LogManager.getLogger(Configs.class);

	@Bean
	public CacheManager cacheManager() {
		logger.info("***** CACHE MANAGER INITIALIZING *****");
		return new ConcurrentMapCacheManager("library");
	}

}
