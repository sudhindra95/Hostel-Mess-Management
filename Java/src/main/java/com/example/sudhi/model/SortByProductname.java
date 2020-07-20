package com.example.sudhi.model;

import java.util.Comparator;

public class SortByProductname implements Comparator<FinalStock> {

	@Override
	public int compare(FinalStock fs1, FinalStock fs2) {
		
		return fs1.getProductname().compareTo(fs2.getProductname());
	}

}
