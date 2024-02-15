package org.neroanimals.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PageResponse<T> {

    int total;
    List<T> list;
}
