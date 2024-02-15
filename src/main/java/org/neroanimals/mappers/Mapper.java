package org.neroanimals.mappers;

public interface Mapper<MODEL, IN, OUT> {

    OUT serialize(MODEL model);
    MODEL deserialize(IN in);
}
