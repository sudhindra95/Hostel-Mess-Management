package com.example.sudhi.service;

import java.util.Comparator;
import com.example.sudhi.model.Stock1;

public class DateSorter implements Comparator<Stock1> {

	@Override
    public int compare(Stock1 st1, Stock1 st2) {
        return st1.getDate().compareTo(st2.getDate());
    }
}
