package com.legendarylan.dj;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.legendarylan.mixxx.data.Crate;

//@RepositoryRestResource(collectionResourceRel="crates", path="crates")
public interface CrateRepository extends PagingAndSortingRepository<Crate, Long> {
	List<Crate> findByName(@Param("name") String name);
}
