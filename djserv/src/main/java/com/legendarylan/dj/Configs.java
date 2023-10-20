package com.legendarylan.dj;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class Configs {

	@Bean
	public CacheManager cacheManager() {
		System.out.println("***** CACHE MANAGER INITIALIZING *****");
		return new ConcurrentMapCacheManager("library");
	}

}
