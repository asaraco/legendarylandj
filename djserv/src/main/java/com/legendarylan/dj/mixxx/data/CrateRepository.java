package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="crates", path="crates")
public interface CrateRepository extends CrudRepository<Crate, Long> {
	List<Crate> findByName(@Param("name") String name);
}
