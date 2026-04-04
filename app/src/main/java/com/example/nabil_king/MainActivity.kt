package com.example.nabil_king// Sesuaikan dengan package name Anda

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.textfield.TextInputEditText

class MainActivity : AppCompatActivity() {  // Perhatikan: ada tanda kurung ()

    private lateinit var etAlas: TextInputEditText
    private lateinit var etTinggi: TextInputEditText
    private lateinit var etPanjang: TextInputEditText
    private lateinit var etLebar: TextInputEditText
    private lateinit var etTinggiBalok: TextInputEditText
    private lateinit var btnHitungSegitiga: Button
    private lateinit var btnHitungBalok: Button
    private lateinit var tvHasil: TextView

    override fun onCreate(savedInstanceState: Bundle?) {  // override harus diawali dengan override
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Inisialisasi View
        initViews()

        // Set click listeners
        btnHitungSegitiga.setOnClickListener {
            hitungLuasSegitiga()
        }

        btnHitungBalok.setOnClickListener {
            hitungVolumeBalok()
        }
    }

    private fun initViews() {
        etAlas = findViewById(R.id.etAlas)
        etTinggi = findViewById(R.id.etTinggi)
        etPanjang = findViewById(R.id.etPanjang)
        etLebar = findViewById(R.id.etLebar)
        etTinggiBalok = findViewById(R.id.etTinggiBalok)

        btnHitungSegitiga = findViewById(R.id.btnHitungSegitiga)
        btnHitungBalok = findViewById(R.id.btnHitungBalok)

        tvHasil = findViewById(R.id.tvHasil)
    }

    private fun hitungLuasSegitiga() {
        val alasStr = etAlas.text.toString().trim()
        val tinggiStr = etTinggi.text.toString().trim()

        if (alasStr.isEmpty()) {
            etAlas.error = "Alas tidak boleh kosong"
            return
        }

        if (tinggiStr.isEmpty()) {
            etTinggi.error = "Tinggi tidak boleh kosong"
            return
        }

        try {
            val alas = alasStr.toDouble()
            val tinggi = tinggiStr.toDouble()

            if (alas <= 0) {
                etAlas.error = "Alas harus lebih dari 0"
                return
            }

            if (tinggi <= 0) {
                etTinggi.error = "Tinggi harus lebih dari 0"
                return
            }

            val luas = 0.5 * alas * tinggi

            val hasil = String.format(
                "Luas Segitiga\n" + "Rumus: ½ × alas × tinggi\n" + "= ½ × %.2f × %.2f\n" + "= %.2f cm²",
                alas,
                tinggi,
                luas
            )

            tvHasil.text = hasil

        } catch (e: NumberFormatException) {
            tvHasil.text = "Error: Format angka tidak valid"
        }
    }

    private fun hitungVolumeBalok() {
        val panjangStr = etPanjang.text.toString().trim()
        val lebarStr = etLebar.text.toString().trim()
        val tinggiStr = etTinggiBalok.text.toString().trim()

        if (panjangStr.isEmpty()) {
            etPanjang.error = "Panjang tidak boleh kosong"
            return
        }

        if (lebarStr.isEmpty()) {
            etLebar.error = "Lebar tidak boleh kosong"
            return
        }

        if (tinggiStr.isEmpty()) {
            etTinggiBalok.error = "Tinggi tidak boleh kosong"
            return
        }

        try {
            val panjang = panjangStr.toDouble()
            val lebar = lebarStr.toDouble()
            val tinggi = tinggiStr.toDouble()

            if (panjang <= 0) {
                etPanjang.error = "Panjang harus lebih dari 0"
                return
            }

            if (lebar <= 0) {
                etLebar.error = "Lebar harus lebih dari 0"
                return
            }

            if (tinggi <= 0) {
                etTinggiBalok.error = "Tinggi harus lebih dari 0"
                return
            }

            val volume = panjang * lebar * tinggi

            val hasil = String.format(
                "Volume Balok\n" + "Rumus: panjang × lebar × tinggi\n" + "= %.2f × %.2f × %.2f\n" + "= %.2f cm³",
                panjang,
                lebar,
                tinggi,
                volume
            )

            tvHasil.text = hasil

        } catch (e: NumberFormatException) {
            tvHasil.text = "Error: Format angka tidak valid"
        }
    }
}