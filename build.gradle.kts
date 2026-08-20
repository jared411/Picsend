plugins { id("com.android.application"); id("org.jetbrains.kotlin.android") }
android { namespace="com.picsend.app"; compileSdk=35
 defaultConfig { applicationId="com.picsend.app"; minSdk=24; targetSdk=35; versionCode=2; versionName="1.1" }
}
dependencies { implementation("androidx.core:core-ktx:1.15.0"); implementation("androidx.activity:activity-compose:1.10.1"); implementation(platform("androidx.compose:compose-bom:2024.12.01")); implementation("androidx.compose.ui:ui"); implementation("androidx.compose.ui:ui-tooling-preview"); implementation("androidx.compose.material3:material3"); implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.7") }
