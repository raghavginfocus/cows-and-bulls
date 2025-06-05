package com.example.cowsandbulls

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Load dictionary words from the raw resource file
        val inputStream = resources.openRawResource(R.raw.dictionary)
        val words = inputStream.bufferedReader().readLines()
        inputStream.close()

        // Show how many words were loaded
        val textView: TextView = findViewById(R.id.textView)
        textView.text = getString(R.string.words_loaded, words.size)
    }
}
