package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel="crates", path="crates")
@CrossOrigin("http://localhost:4200")
public interface CrateRepository extends CrudRepository<Crate, Long> {
	List<Crate> findByName(@Param("name") String name);
}
