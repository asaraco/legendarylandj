package com.legendarylan.sqlite;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

/**
 * Adapted from
 * https://github.com/eugenp/tutorials/blob/master/persistence-modules/spring-data-rest/src/main/java/com/baeldung/books/config/DbConfig.java
 * @author lemmh
 *
 */
@Configuration
public class DbConfig {
	@Autowired Environment env;

	@Bean
	public DataSource dataSource() {
	    final DriverManagerDataSource dataSource = new DriverManagerDataSource();
	    dataSource.setDriverClassName(env.getProperty("driverClassName"));
	    dataSource.setUrl(env.getProperty("url"));
	    dataSource.setUsername(env.getProperty("user"));
	    dataSource.setPassword(env.getProperty("password"));
	    return dataSource;
	}
}
/*
@Configuration
@Profile("sqlite")
@PropertySource("classpath:application.properties")
class SqliteConfig {
}
*/