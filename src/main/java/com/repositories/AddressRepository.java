package com.repositories;

import com.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    @Query(value = "SELECT * FROM address where address.country = :country and address.city = :city and address.postal_code = :postalCode " +
            "and address.street_name = :streetName and address.street_number = :streetNumber", nativeQuery = true)
    Optional<Address> findAddressByAttributeCombination(@Param("country") String country, @Param("city") String city,
                                                        @Param("postalCode")int postalCode, @Param("streetName") String streetname,
                                                        @Param("streetNumber") int streetNumber);
}
